"use strict";

const jwt = require("jsonwebtoken");
const { getConnection } = require("../../database/mysqlConnection.js");
const validateToken = require("../../middlewares/validateToken");
const {
    validatePassword,
    generateJWT,
} = require("../../services/cryptoServices.js");
const { invalidCredentials } = require("../../services/errorService.js");

async function loginUser(data) {
    console.log(data);
    const pool = getConnection();
    console.log("email: ", data.email);
    console.log("pass: ", data.password);
    if (!data.email || !data.password) {
        console.log("email o password mal (primera validacion)");
        throw invalidCredentials();
    }

    const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
        data.email,
        console.log("otra vez: ", data.email),
    ]);

    console.log("row", rows);
    if (rows.length === 0) {
        throw invalidCredentials();
    }

    // if (!user.emailValidated) {
    //     console.log("no validado");
    //     throw errorService.emailNotValidated();
    // }

    console.log("a ver si el password se valida");
    console.log(rows[0].password);
    const passwordMatch = await validatePassword(
        data.password,
        rows[0].password
    );
    console.log("ha llegado hasta aqui");

    if (!passwordMatch) {
        console.log("No matchea el pass");
        throw invalidCredentials();
    }
    console.log("Todo OK");
    console.log("generando Token");

    const token = generateJWT(data);
    const secretKey = process.env.JWT_SECRET;

    console.log("token: ", token);

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
