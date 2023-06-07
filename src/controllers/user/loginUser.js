"use strict";
/**
 * pendiente confirmar si funciona
 */
const { getConnection } = require("../../database/mysqlConnection.js");
const cryptoServices = require("../../services/cryptoServices.js");
const jwt = require("jsonwebtoken");
const timeService = require("../../services/timeService.js");
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

    const passwordMatch = await crystoServices.comparePasswords(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }
    // Generar el token
    const generateToken = (user) => {
        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        const token = jwt.sign(userData, "secretKey", {
            expiresIn: timeService.getTimestampMinutesFromNow(6), // expira en 6 minutos
        });
        // "secretKey" // esta será una clave secreta real y segura para firmar el token
        return token;
    };
    const token = generateToken(user);
    return token;
}
module.exports = loginUser;
