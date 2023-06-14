'use strict'

const Joi = require("joi");

// Definición del esquema de validación utilizando Joi
module.exports = Joi.object({
    nameMember: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    birthday: Joi.date().required(),
    acceptedTOS: Joi.bool().required(),
});
