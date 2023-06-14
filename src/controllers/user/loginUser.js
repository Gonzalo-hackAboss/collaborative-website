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

// Función para autenticar un usuario
async function loginUser(data) {
    const pool = getConnection();

    // Verificar si se proporcionaron el email y la contraseña
    if (!data.email || !data.password) {
        console.log("email o password mal (primera validacion)");
        throw invalidCredentials();
    }

    // Consultar la base de datos para obtener el ID y el rol del usuario por su email
    const [rows] = await pool.query(
        "SELECT id, role FROM Users WHERE email = ?",
        [data.email]
    );

    console.log("row", rows);
    // Verificar si no se encontró ningún usuario con el email proporcionado
    if (rows.length === 0) {
        throw invalidCredentials();
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    const passwordMatch = await validatePassword(
        data.password,
        rows[0].password
    );

    // Verificar si la contraseña no coincide
    if (!passwordMatch) {
        throw invalidCredentials();
    }

    // Generar el token de autenticación utilizando el ID y el rol del usuario
    const token = generateJWT(rows[0]);

    // Devolver la respuesta de autenticación exitosa con el token generado
    return {
        success: true,
        token: token,
        message: "Usuario autenticado correctamente",
    };
}

module.exports = loginUser;
