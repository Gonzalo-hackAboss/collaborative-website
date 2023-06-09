"use strict";
// const cryptoServices = require("../../services/cryptoServices.js");
// const dbServices = require("../../services/dbService.js");
const emailServices = require("../../services/emailService.js");
const timeService = require("../../services/timeService.js");
const errorService = require("../../services/errorService.js");
const {
    hashPassword,
    generaterandomvalidationcode,
    generateUUID,
} = require("../../services/cryptoServices.js");
const { saveUser, saveValidationCode } = require("../../services/dbService.js");
const {
    setSenderCredentials,
    sendValidationEmail,
} = require("../../services/emailService.js");

module.exports = async (userData) => {
    console.log("datos: ", userData);
    if (!userData.acceptedTOS) {
        return {
            success: false,
            error: "Did not accepte TOS",
        };
    }
    // Se hashea la contraseña
    const hashedPassword = hashedPassword(userData.password);

    // Se genera el código de validación
    const randomCode = generateRandomValidationCode();

    // Se genera nuevo id de usuario
    const newUserId = generateUUID();

    // Se guarda usuario en la db
    const user = {
        ...userData,
        password: hashedPassword,
        id: newUserId,
        emailValidate: false,
    };
    await saveUser(user);

    // Establecer las credenciales del remitente
    setSenderCredentials(user.email, user.password);

    // Se guarda el código de validación
    const expiraTimestamp = timeService.getTimestampMinutesFromNow(6);
    const validationCode = {
        id: generateUUID(),
        userId: user.id,
        code: randomCode,
        expiraTimestamp,
    };
    await saveValidationCode(validationCode);

    // Se envía mail
    await sendValidationEmail();

    return {
        success: true,
    };
};
