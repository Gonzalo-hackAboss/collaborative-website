"use strict";
/**
 * me está dando un error
 * [AsyncFunction: loginUser]
Error: Access denied for user ''@'localhost' (using password: YES)
Completed running './user/test-loginUser.js'

revisando .env y conex, db
 */
require("dotenv").config();

const loginUser = require("./loginUser.js");

async function testLoginUser() {
    try {
        // Caso de prueba: Credenciales válidas
        const email = "admin@collaborative-website.com";
        const password = "password1234";
        const token = await loginUser(email, password);
        console.log("Token generado:", token);

        // Caso de prueba: Credenciales inválidas (email incorrecto)
        const invalidEmail = "ana@collaborative-website.com";
        const invalidPassword = "password3219";
        const invalidToken = await loginUser(invalidEmail, invalidPassword);
        console.log("Token generado (inválido):", invalidToken);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Ejecutar la función de prueba
testLoginUser();
console.log(loginUser);
