'use strict'

const parseJWT = require("../services/cryptoServices.js").parseJWT; 


/**
 * Middleware para validar el token del usuario.
 * Se extrae el token de autorización de las cabeceras de la solicitud y lo valida,
 * si el token es válido, asigna el usuario extraído del token al objeto req.currentUser,
 * si el token es inválido o no se proporciona, asigna null a req.currentUser,
 * Luego pasa al siguiente middleware en la cadena de procesamiento.
 */
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(
        "recibiendo el TOKEN en validateToken.js",
        req.headers.authorization
    );
    if (token) {
        const user = parseJWT(token);
        console.log("user: ", user);
        if (user) {
            req.currentUser = user;
        } else {
            req.currentUser = null;
        }
    } else {
        req.currentUser = null;
    }
    next();
};
