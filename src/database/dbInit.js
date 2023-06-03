'use strict';

require("dotenv").config();

const cryptoService = require("../database/services/crypto/service.js");
const {getConnection} = require("./mysqlConnection.js");

const DATABASE_NAME = process.env.MYSQL_DATABASE;

const initDB = async () =>{
    const pool = getConnection();
    //BORRO LA BASE DE DATOS SI EXISTE
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    //CREO LA BASE DE DATOS
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    await pool.query(`USE ${DATABASE_NAME}`);
    //CREO LA TABLA DE USUARIOS
    await createDataBaseTables(pool);
    await insertAdminUsers(pool);
    await insertModUsers(pool);
    await pool.end();
};
    async function createDataBaseTables(pool){
    await pool.query(`
        CREATE TABLE Users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nameMember VARCHAR(50) NOT NULL,
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
        //CREO LA TABLA DE POST
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
        //CREO LA TABLA DE TEMAS
    await pool.query(`
        CREATE TABLE Tems(
            id INT AUTO_INCREMENT PRIMARY KEY,
            category VARCHAR(50) NOT NULL,
            description VARCHAR(50) NOT NULL,
        )`)
        //CREO LA TABLA DE POST IMAGENES
    await pool.query(`
        CREATE TABLE PostImages(
            id INT AUTO_INCREMENT PRIMARY KEY,
            imageURL VARCHAR(300),
            FOREIGN KEY (idPost) REFERENCES Posts (id)
        )`)
        //CREO LA TABLA DE VALIDACIONES
    await pool.query(`
        CREATE TABLE Validation(
            id INT AUTO_INCREMENT PRIMARY KEY,
            code CHAR(8) NOT NULL,
            limitTime
            FOREIGN KEY (idUser) REFERENCES Users (id)
        )`)
        //CREO LA TABLA DE POST DE LOS COMENTARIOS
    await pool.query(`
        CREATE TABLE PostComments(
            id INT AUTO_INCREMENT PRIMARY KEY,
            comments TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (idPost) REFERENCES Posts (id)
            FOREIGN KEY (idUser) REFERENCES Users (id)
        )`)
        //CREO LA TABLA DE VOTOS
    await pool.query(`
        CREATE TABLE Votes(
            id INT AUTO_INCREMENT PRIMARY KEY,
            votes BOOL NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES Users (id)
            FOREIGN KEY (idPost) REFERENCES Posts (id)
        )`)
};

async function insertAdminUsers(pool) {
    await pool.execute(
        `
        INSERT INTO users(id,name,email,password,birthDate,acceptedTOS,admin) 
        VALUES(?,?,?,?,?,?,?)  
        `,
        [
            cryptoService.generateUUID(),
            "Pepe Ruiz",
            "admin@collaborative-website.com",
            await cryptoService.hashPassword("password1234"),
            "1985-06-25",
            true,
            true,
            true,
        ]
    );
}

async function insertModUsers(pool) {
    await pool.execute(
        `
        INSERT INTO users(id,name,email,password,birthDate,acceptedTOS,mod) 
        VALUES(?,?,?,?,?,?,?)  
        `,
        [
            cryptoService.generateUUID(),
            "Luis Sanchez",
            "mod@collaborative-website.com",
            await cryptoService.hashPassword("password4321"),
            "1990-03-28",
            true,
            true,
            true,
        ]
    );
}


for(const user of user) {
    await pool.execute(
        `
        INSERT INTO users(id,nameMember,email,password,birthDate,acceptedTOS,biography,avatar,country) 
        VALUES(?,?,?,?,?,?,?,?,?)
        `,
        [
            user.id,
            user.nameMember,
            user.email,
            user.password,
            user.birthDate,
            user.acceptedTOS,
            user.biography,
            user.avatar,
            user.coutry,
        ]
    );
}

for(const post of posts) {
    await pool.execute(
        `
        INSERT INTO posts(id,title,description,userId,category)
        VALUES(?,?,?,?,?)
        `,
        [post.id, post.title, post.description, post.userId, post.category]
    );

for(const tem of tems) {
    await pool.execute(
        `
        INSERT INTO tems(id,category,description)
        VALUES(?,?,?)
        `,
        [tem.id, tem.category, tem.description]
    );
}

for(const postImagen of postImagens) {
    await pool.execute(
        `
        INSERT INTO postImagens(id,PostId,image)
        VALUES(?,?,?)
        `,
        [postImagen.id, postImagen.postId, postImagen.image]
    );
}

for(const validation of validation) {
    await pool.execute(
        `
        Insert INTO validation(UserId,code,limitTime)
        Values(?,?,?)
        `,
        [validation.userId, validation.code, validation.limitTime]
    );
}

for(const postComments of postComments) {
    await pool.execute(
        `
        Insert INTO validation(id,postId,userId,comment)
        Values(?,?,?,?)
        `,
        [postComments.id, postComments.postId, postComments.userId, postComments.comment]
    );
}

for(const votes of votes) {
    await pool.execute(
        `
        Insert INTO validation(id,vote,userId,postId)
        Values(?,?,?,?)
        `,
        [votes.id, votes.vote, votes.userId, votes.postId]
    );
}
}

initDB();
