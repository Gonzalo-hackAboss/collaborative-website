"use strict";
const cryptoServices = require("../../services/cryptoServices.js");
const dbServices = require("../../services/dbService.js");
const emailServices = require("../../services/emailService.js");
const timeServices = require("../../services/timeService.js");
const errorService = require("../../services/errorService.js");

module.exports = async (userData) => {
    if (!userData.acceptTOS) {
        return {
            success: false,
            error: "Did not accepte TOS",
        };
    }
    // Se hashea la contraseña
    const hashedPassword = cryptoServices.hashedPassword(userData.password);

    // Se genera el código de validación
    const randomCode = cryptoServices.generateRandomValidationCode();

    // Se genera nuevo id de usuario
    const newUserId = cryptoServices.generateUUID();

    // Se guarda usuario en la db
    const user = {
        ...userData,
        password: hashedPassword,
        id: newUserId,
        emailValidate: false,
    };
    await dbServices.saveUser(user);

    // Se guarda el código de validación
    const expiraTimestamp = timeService.getTimestampMinutesFromNow(6);
    const validationCode = {
        id: cryptoService.generateUUID(),
        userId: user.id,
        code: randomCode,
        expiraTimestamp,
    };
    await dbServices.saveValidationCode(validationCode);

    // Se envía mail
    await emailServices.sendValidationEmail(validationCode);

    return {
        success: true,
    };
};