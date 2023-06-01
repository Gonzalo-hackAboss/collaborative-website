asier
'use strict';

require("dotenv").config();

const { getConnection } = require("./mysql-connection.js");

const DATABASE_NAME = "collaborative-website";

const initDB = async () =>{
    const pool = getConnection();
    //BORRO LA BASE DE DATOS SI EXISTE
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    //CREO LA BASE DE DATOS
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    await pool.query(`USE ${DATABASE_NAME}`);
    //CREO LA TABLA DE USUARIOS
    await pool.query(`
        CREATE TABLE Users(
            id CHAR(25) PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            birthday VARCHAR(50) NOT NULL,
            acceptedTOS BOOL NOT NULL,
            biography char300,
            avatarURL VARCHAR(300),
            country VARCHAR(150),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    await pool.query(`
        CREATE TABLE POSTS(
            id CHAR(25) PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(50) NOT NULL,
            description VARCHAR(150) NOT NULL,
            category VARCHAR(50) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES user (id)
        )
    )`);

=====
'use strict';

require("dotenv").config();

const { getConnection } = require("./mysql-connection.js");

const DATABASE_NAME = "collaborative-website";

const initDB = async () =>{
    const pool = getConnection();
    //BORRO LA BASE DE DATOS SI EXISTE
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    //CREO LA BASE DE DATOS
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    await pool.query(`USE ${DATABASE_NAME}`);
    //CREO LA TABLA DE USUARIOS
    await pool.query(`
        CREATE TABLE Users(
            id CHAR(25) PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            birthday VARCHAR(50) NOT NULL,
            acceptedTOS BOOL NOT NULL,
            biography char300,
            avatarURL VARCHAR(300),
            country VARCHAR(150),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
    await pool.query(`
        CREATE TABLE POSTS(
            id CHAR(25) PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(50) NOT NULL,
            description VARCHAR(150) NOT NULL,
            category VARCHAR(50) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES user (id)
        )
    )`);
    
 main
};