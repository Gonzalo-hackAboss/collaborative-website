"use strict";

const { getConnection } = require("../database/mysqlConnection.js");
const { emailAlreadyRegistered } = require("./errorService.js");

const db = getConnection();

module.exports = {
    // Guardar un usuario en la base de datos
    async saveUser(user) {
        const statement = `
        INSERT INTO Users(id, nameMember, email, password, birthday, acceptedTOS, validated)
        VALUES(?, ?, ?, ?, ?, ?, ?)
      `;
        await db.execute(statement, [
            user.id,
            user.nameMember,
            user.email,
            user.password,
            user.birthday,
            user.acceptedTOS,
            user.validated,
        ]);
    },

    // Obtener un usuario por correo electrónico
    async getUserByEmail(email) {
        const statement = `
        SELECT *
        FROM users
        WHERE users.email = ?
      `;
        const [rows] = await db.execute(statement, [email]);

        // if (rows.length > 0) {
        //     throw emailAlreadyRegistered();
        // }

        return rows[0];
    },

    // Obtener usuarios habilitados
    async getEnabledUsers() {
        const statement = `
        SELECT *
        FROM users
        WHERE emailValidated = true
      `;
        const [rows] = await db.execute(statement);

        return rows;
    },

    // Guardar código de validación
    async saveValidationCode(code) {
        const statement = `
        INSERT INTO Validation(id, idUser, code)
        VALUES(?, ?, ?)
      `;
        await db.execute(statement, [code.id, code.idUser, code.code]);
    },

    // Obtener todos los usuarios
    async getAllUsers() {
        try {
            const db = getConnection();
            const query = "SELECT * FROM users";
            const [rows] = await db.query(query);
            db.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Obtener todos los posts
    async getAllPosts() {
        const statement = `
        SELECT id, title, entradilla, idUser, createdAt
        FROM Posts
        WHERE id <> (
          SELECT id
          FROM Posts
          ORDER BY createdAt DESC
          LIMIT 1
        )
        ORDER BY createdAt DESC;
      `;
        const [rows] = await db.execute(statement);
        return rows;
    },

    // Obtener el último post
    async getLastPost() {
        const statement = `
      SELECT * FROM Posts
      ORDER BY createdAt DESC
      LIMIT 1
    `;
        const [rows] = await db.execute(statement);
        return rows;
    },

    // Obtener un post por su ID
    async getPostById(postId) {
        const statement = `
      SELECT *
      FROM Posts
      WHERE id = ?
    `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0];
    },

    // Guardar un post en la base de datos
    async savePost(post) {
        const statement = `
        INSERT INTO posts(id, idUser, title, entradilla, description)
        VALUES(?, ?, ?, ?, ?)
      `;
        await db.execute(statement, [
            post.id,
            post.idUser,
            post.title,
            post.entradilla,
            post.description,
        ]);
    },

    // Actualizar un post en la base de datos
    async updatePost(post) {
        const statement = `
        UPDATE posts
        SET title = ?, description = ?
        WHERE id = ?
      `;
        await db.execute(statement, [post.title, post.description, post.id]);
    },

    // Obtener comentarios por ID de post
    async getCommentsByPostId(postId) {
        const statement = `
        SELECT *
        FROM post_comments as cp
        WHERE cp.postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);

        return rows;
    },

    // Guardar un comentario en la base de datos
    async saveComment(postComment) {
        const statement = `
        INSERT INTO post_comments(id, userId, postId, comment)
        VALUES(?, ?, ?, ?)
      `;
        await db.execute(statement, Object.values(postComment));
    },

    // Contar la cantidad de votos de un post
    async countVotes(postId) {
        const statement = `
        SELECT COUNT(*) as votes FROM Votes
        WHERE postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].votes;
    },

    // Contar la cantidad de comentarios por ID de post
    async countCommentsByPostId(postId) {
        const statement = `
        SELECT COUNT(*) as comments FROM post_comments
        WHERE postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].comments;
    },

    // Eliminar un post de la base de datos
    async deletePost(postId) {
        const statement = `
        DELETE FROM posts
        WHERE id = ?
      `;
        await db.execute(statement, [postId]);
    },

    // Actualizar un comentario en la base de datos
    async updateComment(commentId, commentPayload) {
        const statement = `
        UPDATE post_comments
        SET comment = ?
        WHERE id = ?
      `;
        await db.execute(statement, [commentPayload.comment, commentId]);
    },

    // Eliminar un comentario de la base de datos
    async deleteComment(commentId) {
        const statement = `
        DELETE FROM post_comments
        WHERE id = ?
      `;
        await db.execute(statement, [commentId]);
    },

    // Obtener un comentario por su ID
    async getCommentById(commentId) {
        const statement = `
        SELECT * FROM post_comments
        WHERE id = ?
      `;
        const [rows] = await db.execute(statement, [commentId]);
        return rows[0];
    },
};
