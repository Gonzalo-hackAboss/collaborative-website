const errorService = require("../src/services/errorService.js");

module.exports = (req, res, next) => {
    if (!req.currentUser) {
        //No estoy autenticado
        errorService.invalidCredentials();
    }

    next();
};
