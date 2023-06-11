"use strict";

const jwt = require("jsonwebtoken");

const { getConnection } = require("../../database/mysqlConnection.js");
const cryptoServices = require("../../services/cryptoServices.js");
const validateToken = require("../../middlewares/validateToken");
const errorService = require("../../services/errorService.js");

async function loginUser(email, password) {
    const pool = getConnection();

    if (!email || !password) {
        throw errorService.invalidCredentials();
    }

    const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
        email,
    ]);

    if (rows.length === 0) {
        throw errorService.invalidCredentials();
    }

    const user = rows[0];

    if (!user.emailValidated) {
        throw errorService.emailNotValidated();
    }

    const passwordMatch = await cryptoServices.validatePassword(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw errorService.invalidCredentials();
    }

    const token = generateJWT(user);
    const secretKey = process.env.JWT_SECRET; // llama .env con clave secreta

    const decodedToken = validateToken(token, secretKey);

    if (decodedToken === null) {
        throw errorService.notAuthenticated();
    }
}

module.exports = loginUser;
