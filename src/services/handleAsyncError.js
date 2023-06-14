'use strict'

module.exports = (controllerFn) => {
    // Middleware para el controlador
    return async (req, res, next) => {
        try {
            
            await controllerFn(req, res);
        } catch (error) {
            
            next(error);
        }
    };
};
