const casual = require("casual");
const { generateUUID, hashPassword } = require("../services/cryptoServices");
const { getConnection } = require("../database/mysqlConnection");
const { saveUser } = require("../services/dbService");
const roles = ["Usuario", "Administrador", "Moderador", "VIP"];
const randomizador = Math.floor(Math.random() * roles.length);

const db = getConnection();

async function createUser() {
    try {
        const user = {
            id: generateUUID(),
            nameMember: casual.username,
            email: casual.email,
            password: hashPassword(casual.password),
            birthday: casual.date((format = "YYYY-MM-DD")),
            acceptedTOS: true,
            validated: casual.boolean,
            role: roles[randomizador],
        };
        await saveUser(user);

        console.log("Usuario creado con exito");
        console.log("usuarios: ", users);
        const users = await getAllUsers();

        db.end();
    } catch (error) {
        console.error("no se puedo crear el usuario: ", error);
    }
}

createUser();
