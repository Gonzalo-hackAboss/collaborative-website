"use strict";

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    /*Hashea la contraseña, devuelve la contraseña hasheada y valida la contraseña con respecto al hash.*/

    async hashPassword(plainPassword) {
        console.log("password plain: ", plainPassword);
        return await bcrypt.hash(plainPassword, 10);
    },

    async validatePassword(plainPassword, hash) {
        return await bcrypt.compare(plainPassword, hash);
    },

    generateValidationCode() {
        const code = math.floor(100000 + math.random() * 900000).toString();
        return code;
    },

    /*Generar un identificador único*/

    generateUUID() {
        return crypto.randomUUID();
    },

    generateJWT(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expireIn: "5 days",
        });
    },
    parseJWT(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET);
            return userData;
        } catch {
            return null;
        }
    },
};
