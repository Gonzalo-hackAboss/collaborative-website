const jwt = require("jsonwebtoken");
const cryptoService = require("../services/cryptoServices.js");
const sendError = require("../utils/sendError.js");


    // Exportar esto:
    function validateToken(token, secretKey) {
        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (error) {
            return null;
        }
    };

    module.exports = validateToken;

// Llevar este código donde se tenga que ejecutar.

/*
// pasado a loginUser
const token = "..."; // El token que deseas validar
const secretKey = "..."; // Llamar al .env con la CLAVE SECRETA del token

const decodedToken = validateToken(token, secretKey);

if ((decodedToken = null)) {
    // El token no es válido
    sendError();
}
*/
