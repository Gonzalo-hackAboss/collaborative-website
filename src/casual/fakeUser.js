const casual = require("casual");
const { generateUUID } = require("../services/cryptoServices");
const { getConnection } = require("../database/mysqlConnection");
getConnection();

const roles = ["Usuario", "Administrador", "Moderador", "VIP"];
const randomizador = Math.floor(Math.random() * roles.length);

const id = generateUUID();
const nameMember = casual.username;
const email = casual.email;
const birthday = casual.date((format = "YYYY-MM-DD"));
const acceptedTOS = true;
const validated = casual.boolean;
const role = roles[randomizador];

const query = `
    INSERT INTO Users (
        id,
        nameMember,
        email,
        birthday,
        acceptedTOS,
        validated,
        role
    ) VALUES (
        '${id}',
        '${nameMember}',
        '${email}',
        '${birthday}',
        ${acceptedTOS ? 1 : 0},
        ${validated ? 1 : 0},
        '${role}'
    )
    `;

connection.query(query, (error, results, fields) => {
    if (error) {
        console.error("Error al insertar los datos:", error);
    } else {
        console.log("Datos insertados correctamente");
    }

    connection.end();
});
