'use strict'

const errorService = require("../services/errorService.js");


module.exports = (req, res, next) => {
    if (!req.currentUser) {
        // No estoy autenticado
        const error = errorService.invalidCredentials();
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }

    next();
};
