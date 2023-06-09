const casual = require("casual");
const { generateUUID, hashPassword } = require("../services/cryptoServices");
const { getConnection } = require("../database/mysqlConnection");
const { saveUser } = require("../services/dbService");
const roles = ["Usuario", "Administrador", "Moderador", "VIP"];
const randomizador = Math.floor(Math.random() * roles.length);

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

saveUser(user);
