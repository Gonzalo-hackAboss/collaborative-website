"use strict";

require("dotenv").config();

const hashpassword = require("../../services/cryptoServices.js");
const { getConnection } = require("../database/mysqlConnection.js");

const DATABASE_NAME = process.env.MYSQL_DATABASE;

const initDB = async () => {
    const pool = getConnection();
    //BORRO LA BASE DE DATOS SI EXISTE
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    //CREO LA BASE DE DATOS
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    await pool.query(`USE ${DATABASE_NAME}`);
    // Eliminamos previos de la BBDD
    await pool.query(
        `DROP TABLE IF EXISTS Votes, PostComments, Validation, PostImages, CategoriesPosts, Categories, Posts, Roles, Users;`
    );
    //CREO LA TABLA DE USUARIOS
    await createDataBaseTables(pool);
    await insertAdminUsers(pool);
    await insertModUsers(pool);
    await pool.end();
};
async function createDataBaseTables(pool) {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Users(
        id CHAR(36) PRIMARY KEY,
        nameMember VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL,
        birthday CHAR(8) NOT NULL,
        acceptedTOS BOOL NOT NULL,
        validated BOOL NOT NULL DEFAULT false,
        biography CHAR(255),
        avatarURL VARCHAR(255),
        country VARCHAR(150),
        role ENUM('Administrador', 'Moderador', 'Usuario', 'VIP') DEFAULT 'Usuario',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`);

    //CREO LA TABLA DE POST
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Posts(
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        idUser CHAR(36),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (idUser) REFERENCES Users (id) ON DELETE CASCADE
    );`);

    //CREO LA TABLA DE CATEGORIAS
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Categories(
        id CHAR(36) PRIMARY KEY,
        category ENUM('Salud', 'Politica', 'Deportes', 'Viajes', 'Cocina', 'Internacional, 'Nacional', 'Música') NOT NULL,
        description VARCHAR(50) NOT NULL
    );`);
    // DEFINIR QUE CATEGORIAS USAREMOS!

    // CREAMOS TABLA DE CATEGORIAS Y POSTS PARA BUSCADOR
    await pool.query(`
    CREATE TABLE IF NOT EXISTS CategoriesPosts(
        id CHAR(36) PRIMARY KEY,
        idPost CHAR(36) NOT NULL,
        idCategory CHAR(36) NOT NULL,
        FOREIGN KEY (idPost) REFERENCES Posts (id) ON DELETE CASCADE,
        FOREIGN KEY (idCategory) REFERENCES Categories (id) ON DELETE CASCADE
    );
    `);

    //CREO LA TABLA DE POST IMAGENES
    await pool.query(`
    CREATE TABLE IF NOT EXISTS PostImages(
        id CHAR(36) PRIMARY KEY,
        idPost CHAR(36) NOT NULL,
        imageURL VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (idPost) REFERENCES Posts (id) ON DELETE CASCADE
    );`);

    //CREO LA TABLA DE VALIDACIONES
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Validation(
        id CHAR(36) PRIMARY KEY,
        code CHAR(8) NOT NULL,
        limitTime VARCHAR(36) NOT NULL,
        idUser CHAR(36) NOT NULL,
        FOREIGN KEY (idUser) REFERENCES Users (id) ON DELETE CASCADE
    );
    `);
    // ¿Debe ser Null el limitTime?

    //CREO LA TABLA DE POST DE LOS COMENTARIOS
    await pool.query(`
    CREATE TABLE IF NOT EXISTS PostComments(
        id CHAR(36) PRIMARY KEY,
        comments TEXT NOT NULL,
        idPost CHAR(36) NOT NULL,
        iDUser CHAR(36) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (idPost) REFERENCES Posts (id) ON DELETE CASCADE,
        FOREIGN KEY (idUser) REFERENCES Users (id) ON DELETE CASCADE
    );
    `);

    //CREO LA TABLA DE VOTOS
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Votes(
	    id CHAR(36) PRIMARY KEY,
        idUser CHAR(36) NOT NULL,
        idPost CHAR(36) NOT NULL,
	    votes BOOL NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (idUser) REFERENCES Users (id),
	FOREIGN KEY (idPost) REFERENCES Posts (id)
);`);
}

initDB().catch(console.error);

// async function generateFakeUsers(pool) {
//     const [users, posts] = await generateUsersAndPosts();
//     for (const user of users) {
//         await pool.execute(
//             `
//         INSERT INTO Users(id,nameMember,email,password,birthday,acceptedTOS,validated)
//         VALUES(?,?,?,?,?,?,?)
//         `,
//             [
//                 user.id,
//                 user.nameMember,
//                 user.email,
//                 user.password,
//                 user.birthday,
//                 user.acceptedTOS,
//                 user.validated,
//             ]
//         );
//     }
// }
