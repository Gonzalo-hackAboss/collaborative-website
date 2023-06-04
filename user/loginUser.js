"use strict";
/**
 * pendiente confirmar si funciona
 */
const { getConnection } = require("../src/database/mysqlConnection.js");
const cryptoServices = require("../src/database/services/cryptoServices.js");
const jwt = require("jsonwebtoken");

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
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        "secretKey" // esta será una clave secreta real y segura para firmar el token
    );
    return token;
    return user;
}
module.exports = loginUser;
/*
const cryptoServices = require("../src/database/services/cryptoServices.js");
const dbServices = require("../src/database/services/dbServices.js");

module.exports = async ({ email, plainPassword }) => {
    //obtengo el usuario que corresponda a ese email.
    const user = await dbServices.getUserByEmailUNSAFE(email);
    //si no tengo un usuario, tiro un error ("las credenciales son invalidas")
    if (!user) {
        errorService.invalidCredentials();
        console.log("no existe ningun usuario");
    }
    //si el usuario no validó el email tiro error ("falta validar el email")
    if (!user.emailValidated) {
        errorService.emailNotValidated();
    }
    //valido la plainPassword contra el hash
    const valid = await cryptoServices.validatePassword(
        plainPassword,
        user.password
    );
    //si no es válida, tiro un error ("las credenciales son invalidas")
    if (!valid) {
        errorService.invalidCredentials();
    }
    //-------- ESTOY SEGURO QUE ESTE USUARIO ES VÁLIDO -------------
    //GENERAR EL TOKEN (JWT)
    const token = cryptoServices.generateJWT({
        id: user.id,
        email: user.email,
        name: user.name,
    });
    //DEVUELVO EL TOKEN
    return token;
};
*/
