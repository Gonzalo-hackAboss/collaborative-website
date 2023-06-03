'use strict';

require("dotenv").config();

const { getConnection } = require("./mysqlConnection.js");

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
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(50) NOT NULL,
            birthday CHAR(8) NOT NULL,
            acceptedTOS BOOL NOT NULL,
            biography CHAR(300),
            avatarURL VARCHAR(300),
            country VARCHAR(150),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);
    await pool.query(`
        CREATE TABLE Posts(
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            description VARCHAR(150) NOT NULL,
            category VARCHAR(50) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES Users (id)
        )`);
    await pool.query(`
        CREATE TABLE Tems(
            id INT AUTO_INCREMENT PRIMARY KEY,
            category VARCHAR(50) NOT NULL,
            description VARCHAR(50) NOT NULL,
        )`)
    await pool.query(`
        CREATE TABLE PostImages(
            id INT AUTO_INCREMENT PRIMARY KEY,
            imageURL VARCHAR(300),
            FOREIGN KEY (idPost) REFERENCES Posts (id)
        )`)
    await pool.query(`
        CREATE TABLE Validation(
            id INT AUTO_INCREMENT PRIMARY KEY,
            code CHAR(8) NOT NULL,
            limitTime
            FOREIGN KEY (idUser) REFERENCES Users (id)
        )`)
    await pool.query(`
        CREATE TABLE PostComments(
            id INT AUTO_INCREMENT PRIMARY KEY,
            comments TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (idPost) REFERENCES Posts (id)
            FOREIGN KEY (idUser) REFERENCES Users (id)
        )`)
    await pool.query(`
        CREATE TABLE Votes(
            id INT AUTO_INCREMENT PRIMARY KEY,
            votes BOOL NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES Users (id)
            FOREIGN KEY (idPost) REFERENCES Posts (id)
        )`)
};

initDB(); 
