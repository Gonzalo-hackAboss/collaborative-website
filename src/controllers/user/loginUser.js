"use strict";

const jwt = require("jsonwebtoken");
const { getConnection } = require("../../database/mysqlConnection.js");
const validateToken = require("../../middlewares/validateToken");
const {
    validatePassword,
    generateJWT,
} = require("../../services/cryptoServices.js");
const {
    invalidCredentials,
    notAuthenticated,
} = require("../../services/errorService.js");

async function loginUser(data) {
    const pool = getConnection();

    if (!data.email || !data.password) {
        throw invalidCredentials();
    }

    const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
        data.email,
    ]);

    if (rows.length === 0) {
        throw invalidCredentials();
    }

    // if (!user.emailValidated) {
    //     console.log("no validado");
    //     throw errorService.emailNotValidated();
    // }

    const passwordMatch = await validatePassword(
        data.password,
        rows[0].password
    );

    if (!passwordMatch) {
        throw invalidCredentials();
    }

    const token = generateJWT(rows[0]);
    // const secretKey = process.env.JWT_SECRET;

    // const decodedToken = validateToken(token, secretKey);

    // if (decodedToken === null) {
    //     throw notAuthenticated();
    // }

    return {
        success: true,
        token: token, // Añade el token en la respuesta
        message: "Usuario autenticado correctamente",
    };
}

module.exports = loginUser;
