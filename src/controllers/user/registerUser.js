"use strict";
const timeService = require("../../services/timeService.js");
const errorService = require("../../services/errorService.js");
const {
    hashPassword,
    generaterandomvalidationcode,
    generateUUID,
} = require("../../services/cryptoServices.js");
const {
    saveUser,
    saveValidationCode,
    getUserByEmail,
} = require("../../services/dbService.js");
const {
    setSenderCredentials,
    sendValidationEmail,
} = require("../../services/emailService.js");


module.exports = async (userData) => {
    if (!userData.acceptedTOS) {
        return {
            success: false,
            error: "Did not accepte TOS",
        };
    }

    if (await getUserByEmail(userData.email)) {
        return errorService.emailAlreadyRegistered;
    }

    // Se hashea la contraseña
    const hashedPassword = await hashPassword(userData.password);

    // Se genera el código de validación
    const randomCode = generaterandomvalidationcode();

    // Se genera nuevo id de usuario
    const newUserId = generateUUID();

    // Se guarda usuario en la db
    const user = {
        ...userData,
        password: hashedPassword,
        id: newUserId,
        validated: false,
    };
    console.log(user);
    await saveUser(user);

    // Se guarda el código de validación
    const expiraTimestamp = timeService.getTimestampMinutesFromNow(6);
    const validationCode = {
        id: generateUUID(),
        idUser: user.id,
        code: randomCode,
        expiraTimestamp,
    };
    await saveValidationCode(validationCode);
    console.log("email: ", user.email);
    await sendValidationEmail(user.email, user.nameMember, validationCode.code);

    return {
        success: true,
        message: "User registered",
    };
};