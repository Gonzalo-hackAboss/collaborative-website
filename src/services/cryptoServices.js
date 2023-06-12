"use strict";

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    /*Hashea la contraseña, devuelve la contraseña hasheada y valida la contraseña con respecto al hash.*/
    async hashPassword(plainPassword) {
        return await bcrypt.hash(plainPassword, 10);
    },

    async validatePassword(plainPassword, hash) {
        console.log("validando....");
        console.log(plainPassword);
        console.log(hash);
        return await bcrypt.compare(plainPassword, hash);
    },

    /*Generar código aleatorio para validar los emails, un código de 6 dígitos.*/
    generaterandomvalidationcode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    },

    /*Generar un identificador único*/
    generateUUID() {
        return crypto.randomUUID();
    },

    generateJWT(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "10d",
        });
    },

    parseJWT(token) {
        console.log("token en el PARSE crypto: ", token);
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            return payload;
        } catch {
            return null;
        }
    },
};
