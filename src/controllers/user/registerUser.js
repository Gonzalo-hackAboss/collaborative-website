"use strict";

const { hashPassword, generateRandomValidationCode, generateUUID } = require("../../services/cryptoServices.js");
const { saveUser, saveValidationCode } = require("../../services/dbService.js");
const { setSenderCredentials, sendValidationEmail } = require("../../services/emailService.js");
const timeService = require("../../services/timeService.js");

module.exports = async (userData) => {
  console.log("datos: ", userData);
  if (!userData.acceptedTOS) {
    return {
      success: false,
      error: "Did not accept TOS",
    };
  }

  // Se hashea la contraseña
  const hashedPassword = await hashPassword(userData.password);

  // Se genera el código de validación
  const randomCode = generateRandomValidationCode();

  // Se genera un nuevo id de usuario
  const newUserId = generateUUID();

  // Se guarda el usuario en la base de datos
  const user = {
    ...userData,
    password: hashedPassword,
    id: newUserId,
    emailValidated: false,
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

  // Se envía el correo de validación
  await sendValidationEmail();

  return {
    success: true,
  };
};
