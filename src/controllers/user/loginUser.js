"use strict";

const { getConnection } = require("../../database/mysqlConnection.js");
const cryptoServices = require("../../services/cryptoServices.js");
const jwt = require("jsonwebtoken");
const validateToken = require("../../middlewares/validateToken");
const sendError = require("../../utils/sendError.js");
// const timeService = require("../../services/timeService.js");

async function loginUser(email, password) {
    const pool = getConnection();

    const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
        email,
    ]);

    if (rows.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = rows[0];

    if (!user.emailValidated) {
        throw new Error("Invalid email or password");
    }

    const passwordMatch = await cryptoServices.validatePasswords(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    const token = generateJWT(user);
    const secretKey = process.env.JWT_SECRET; // llama .env con clave secreta

    const decodedToken = validateToken(token, secretKey);

    if (decodedToken === null) {
        // El token no es válido
        sendError();
    }
}

module.exports = loginUser;
