"use strict";

const sendError = require("../utils/sendError");


/**
 * Middleware de validación de esquema
 * 
 * Este middleware se utiliza para validar el cuerpo de la solicitud (req.body) 
 * con un esquema determinado. Si el cuerpo de la solicitud no cumple con el esquema,
 * se devuelve un error de validación. De lo contrario, pasa al siguiente middleware.
 * 
 * 
 * 
 */
module.exports = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            const errorMessage = result.error.details.map(
                (err) => err.message
            )[0];
            res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: errorMessage,
                },
            });
        } else {
            next();
        }
    };
};
