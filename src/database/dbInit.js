"use strict";

require("dotenv").config();
const cryptoService = require("../services/cryptoServices.js");
const { createPool } = require("./mysqlConnection.js");

const DATABASE_NAME = process.env.MYSQL_DATABASE;

const initDB = async () => {
    const pool = createPool();

    //BORRO LA BASE DE DATOS SI EXISTE
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);

    //CREO LA BASE DE DATOS
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    await pool.query(`USE ${DATABASE_NAME}`);

    //CREO LA TABLA DE USUARIOS
    await createDatabaseTables(pool);

    // await insertAdminUsers(pool);

    // await generateFakeData(pool);

    await pool.end();
};

async function createDatabaseTables(pool) {
    await pool.query(`CREATE TABLE IF NOT EXISTS Users(
        id CHAR(36) PRIMARY KEY,
        nameMember VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        birthday TIMESTAMP NOT NULL,
        acceptedTOS BOOL NOT NULL,
        validated BOOL NOT NULL DEFAULT false,
        biography CHAR(255),
        avatarURL VARCHAR(255),
        country VARCHAR(150),
        role ENUM('Administrador', 'Moderador', 'Usuario', 'VIP') DEFAULT 'Usuario',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS Posts(
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        entradilla VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        idUser CHAR(36),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (idUser) REFERENCES Users (id) ON DELETE CASCADE
    );
    `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS Categories(
        id CHAR(36) PRIMARY KEY,
        category ENUM('RPG', 'PS5', 'PS4', 'PS3', 'Retro', 'E3', 'Switch', 'DS', 'Xbox Series', 'Xbox One', 'Xbox 360'),
        description VARCHAR(50) NOT NULL, 
        idPost CHAR(36) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (idPost) REFERENCES Posts (id) ON DELETE CASCADE
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS CategoriesPosts(
	id CHAR(36) PRIMARY KEY,
	idPost CHAR(36) NOT NULL,
	idCategory CHAR(36) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (idPost) REFERENCES Posts (id) ON DELETE CASCADE,
	FOREIGN KEY (idCategory) REFERENCES Categories (id) ON DELETE CASCADE
);`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS PostImages(
        id CHAR(36) PRIMARY KEY,
        idPost CHAR(36) NOT NULL,
        imageURL VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (idPost) REFERENCES Posts (id) ON DELETE CASCADE
        );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS Validation(
        id CHAR(36) PRIMARY KEY,
        code CHAR(6) NOT NULL,
        limitTime VARCHAR(36),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        idUser CHAR(36) NOT NULL,
        FOREIGN KEY (idUser) REFERENCES Users (id) ON DELETE CASCADE
    );`);

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
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS Votes(
        id CHAR(36) PRIMARY KEY,
        idUser CHAR(36) NOT NULL,
        idPost CHAR(36) NOT NULL,
        votes BOOLEAN NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (idUser) REFERENCES Users (id),
        FOREIGN KEY (idPost) REFERENCES Posts (id)
    );`);
}

initDB();
