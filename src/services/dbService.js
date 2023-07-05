"use strict";

const { getConnection } = require("../database/mysqlConnection.js");
const sendResponse = require("../utils/sendResponse.js");

const db = getConnection();

module.exports = {
    async saveUser(user) {
        const statement = `
        INSERT INTO users(id, nameMember, email, password, birthday, acceptedTOS, validated)
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

    // unsafe???
    async getUserByEmail(email) {
        const statement = `
        SELECT *
        FROM users
        WHERE users.email = ?
      `;
        const [rows] = await db.execute(statement, [email]);

        return rows[0];
    },

    async getEnabledUsers() {
        const statement = `
        SELECT *
        FROM users
        WHERE emailValidated = true
      `;
        const [rows] = await db.execute(statement);

        return rows;
    },

    async saveValidationCode(code) {
        console.log(code);
        const statement = `
        INSERT INTO validation(id, idUser, code)
        VALUES(?, ?, ?)
      `;
        await db.execute(statement, [code.id, code.idUser, code.code]);
    },

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

    async getAllPosts() {
        const statement = `
        SELECT id, title, entradilla, idUser, createdAt
        FROM posts
        WHERE id <> (
          SELECT id
          FROM posts
          ORDER BY createdAt DESC
          LIMIT 1
        )
        ORDER BY createdAt DESC;
      `;
        const [rows] = await db.execute(statement);
        return rows;
    },

    async getLastPost() {
        const statement = `
      SELECT * FROM posts
      ORDER BY createdAt DESC
      LIMIT 1
    `;
        const [rows] = await db.execute(statement);
        return rows;
    },

    async getPostById(postId) {
        const statement = `
      SELECT *
      FROM posts
      WHERE id = ?
    `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0];
    },

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

    async updatePost(post) {
        const statement = `
        UPDATE posts
        SET title = ?, description = ?
        WHERE id = ?
      `;
        await db.execute(statement, [post.title, post.description, post.id]);
    },

    async getCommentsByPostId(postId) {
        const statement = `
          SELECT *
          FROM postcomments
          WHERE idPost = ?
        `;
        const [rows] = await db.execute(statement, [postId]);
        console.log("rows: ", rows);

        return rows;
    },

    async getCommentByCommentId(commentId) {
        const statement = `
      SELECT * FROM postcomments
      WHERE id = ?
      `;

        const [rows] = await db.execute(statement, [commentId]);
        return rows;
    },

    async saveComment(newComment) {
        const statement = `
        INSERT INTO postcomments(id, iDUser, idPost, comments)
        VALUES(?, ?, ?, ?)
      `;
        console.log(newComment);
        await db.execute(statement, [
            newComment.id,
            newComment.userId,
            newComment.postId,
            newComment.comment,
        ]);
    },

    async searchByCategory(searchTerm, categoryNameArray) {
        try {
            const likeTerm = `%${searchTerm}%`;
            let statement = `
          SELECT * FROM tems
          WHERE ?
          `;
            for (let i = 0; i < categoryNameArray.length; i++) {
                statement += "OR c.name = ?";
            }

            await db.execute(statement, categoryNameArray);
            const [rows, fields] = await db.execute(
                statement,
                categoryNameArray
            );
            return rows;
        } catch (err) {
            searchError(err);
        }
    },

    async countVotes(postId) {
        const statement = `
        SELECT COUNT(*) as votes FROM votes
        WHERE postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].votes;
    }, // Actualizado para contar los VOTOS, no likes. Posiblemente tengamos que darle una vuelta por el tema de sumar/restar el boolean.

    async countCommentsByPostId(postId) {
        const statement = `
        SELECT COUNT(*) as comments FROM postcomments
        WHERE postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].comments;
    },

    async deletePost(postId) {
        const statement = `
        DELETE FROM posts
        WHERE id = ?
      `;
        await db.execute(statement, [postId]);
    },

    async updateComment(post) {
        console.log("post: ", post);
        const statement = ` 
        UPDATE postcomments
        SET comments = ?
        WHERE id = ?
      `;
        const [rows] = await db.execute(statement, [
            post["comment"],
            post["0"]["id"],
        ]);
        console.log(rows);
        return rows;
    },

    async deleteComment(commentId) {
        console.log("dbService: commentId: ", commentId);
        const statement = `
        DELETE FROM postcomments
        WHERE id = ?
      `;
        await db.execute(statement, [commentId]);
    },

    // cambiar
    async savePhoto(photo) {
        const statement = `
        INSERT INTO postphotos(id, postId, imageURL)
        VALUES(?, ?, ?)
      `;
        await db.execute(statement, Object.values(photo));
    },

    async getPhotoById(photoId) {
        const statement = `
        SELECT * FROM post_photos
        WHERE id = ?
      `;
        const [rows] = await db.execute(statement, [photoId]);
        return rows[0];
    },

    async deletePhoto(photoId) {
        const statement = `
        DELETE FROM post_photos
        WHERE id = ?
      `;
        await db.execute(statement, [photoId]);
    },

    async getPhotosByPostId(postId) {
        const statement = `
        SELECT *
        FROM post_photos as pp
        WHERE pp.postId = ?
      `;
        const [rows] = await db.execute(statement, [postId]);

        return rows;
    },

    async checkUserPermission(postId, userId) {
        const statement = `
        SELECT *
        FROM postcomments
        WHERE idPost = ? AND idUser = ?
      `;
        const [rows] = await db.execute(statement, [postId, userId]);

        return rows.length > 0;
    },
};
