const errorService = require("../services/errorService.js");

module.exports = (req, res, next) => {
    if (!req.currentUser) {
        //No estoy autenticado
        const error = errorService.invalidCredentials();
    }

    next();
};
