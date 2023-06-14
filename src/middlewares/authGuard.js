'use strict'

const errorService = require("../services/errorService.js");


module.exports = (req, res, next) => {
    if (!req.currentUser) {
        //Verificación de la autenticación del usuario 
        const error = errorService.invalidCredentials();
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }

    next();
};
