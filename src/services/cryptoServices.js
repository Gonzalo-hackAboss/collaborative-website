"use strict";

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    // Generar un hash para una contraseña dada
    async hashPassword(plainPassword) {
        return await bcrypt.hash(plainPassword, 10);
    },

    // Validar una contraseña en texto plano con un hash dado
    async validatePassword(plainPassword, hash) {
        return await bcrypt.compare(plainPassword, hash);
    },

    // Generar un código de validación aleatorio de 6 dígitos
    generaterandomvalidationcode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    },

    // Generar un UUID (identificador único universal) utilizando el módulo crypto
    generateUUID() {
        return crypto.randomUUID();
    },

    // Generar un JSON Web Token (JWT) con el payload proporcionado
    generateJWT(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "10d",
        });
    },

    // Analizar un JSON Web Token (JWT) y devolver su contenido (payload)
    parseJWT(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            return { ...payload, token }; // Devolver el payload y el token en un objeto
        } catch {
            return null;
        }
    },
};
