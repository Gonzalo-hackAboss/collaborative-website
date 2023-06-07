"use strict";

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    /*Hashea la contraseña, devuelve la contraseña hasheada y valida la contraseña con respecto al hash.*/

    async hashPassword(PlainPassword) {
        return await bcrypt.hash(PlainPassword, 10);
    },
    async validatePassword(PlainPassword, hash) {
        return await bcrypt.compare(PlainPassword, hash);
    },

    /*Generar código aleatorio para validar los emails, un código de 6 dígitos.*/
    generaterandomvalidationcode() {
        Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    },

    /*
    generaterandomvalidationcode() {
        return "*";
    }
    // 
    */
    /*Generar un identificador único*/
    generateUUID() {
        return crypto.randomUUID();
    },

    generateJWT(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "5 DAYS",
        });
    },
    parseJWT() {
        try {
            const userData = jwt.verify(
                token, //TokenExpiredError,
                process.env.JWT_SECRET
            );
            return userData;
        } catch {
            return null;
        }
    },
};
