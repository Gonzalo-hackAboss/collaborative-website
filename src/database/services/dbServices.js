"use strict";
const { getConnection } = require("../database/mysql-connection.js");
const db = getConnection();

/**
 * Se irán guardando los usuarios por su id en una tabla {}
 * para no perderlos al reiniciar el servidor
 */

module.exports = {
    async saveUser(user) {
        const statement = `
      INSERT INTO Users(id,name,email,password,birthDate,country,acceptedTOS,emailValidated)
      VALUES(?,?,?,?,?,?,?,?,?,?,?)
      `;
        await db.execute(statement, [
            user.id,
            user.name,
            user.email,
            user.password,
            user.birthDate,
            user.acceptedTOS,
            user.biography,
            user.avatarURL,
            user.country || null,
            user.createdAt,
            user.emailValidated,
        ]);
    },

    /*
    async getUserByEmailUNSAFE(email) {
        const statement = `
      SELECT *
      FROM users
      WHERE users.email = ?
    `;
        const [rows] = await db.execute(statement, [email]);

        return rows[0];
    },

    async getEnabledUsers() {
        return usersTable.filter((user) => {
            return user.emailValidated;
        });
    },

    async saveValidationCode(code) {
        const statement = `
    INSERT INTO validation_codes(id,idUser,code)
    VALUES(?,?,?)
    `;
        await db.execute(statement, [code.id, code.idUser, code.code]);
    },

    async getAllUsers() {
        return usersTable;
    },

    async getAllPosts() {
        const statement = `
    SELECT
        p.id,
        p.idUser,
        p.title,
        p.description,
    FROM    
        posts p
        LEFT JOIN (
            SELECT postId, COUNT(*) AS like_count
            FROM post_likes
            GROUP BY postId
        ) l ON p.id = l.postId
        LEFT JOIN (
            SELECT postId, COUNT(*) AS comment_count
            FROM post_comments
            GROUP BY postId
        ) c ON p.id = c.postId
    `;
        const [rows] = await db.execute(statement);
        return rows; //array con posts o vacío
    },
    async savePost(post) {
        const statement = `
    INSERT INTO posts(id,idUser,title,description)
    VALUES(?,?,?,?)
    `;
        await db.execute(statement, [
            post.id,
            post.idUser,
            post.title,
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

    async getPostById(postId) {
        const statement = `
      SELECT *
      FROM posts as p
      WHERE p.id = ?
    `;
        const [rows] = await db.execute(statement, [postId]);

        return rows[0];
    },

    async getCommentsByPostId(postId) {
        const statement = `
      SELECT *
      FROM post_comments as cp
      WHERE cp.postId = ?
    `;
        const [rows] = await db.execute(statement, [postId]);

        return rows;
    },

    async saveComment(postComment) {
        const statement = `
    INSERT INTO post_comments(id,idUser,postId,comment)
    VALUES(?,?,?,?)
    `;
        await db.execute(statement, [
            postComment.id,
            postComment.idUser,
            postComment.postId,
            postComment.comment,
        ]);
    },

    async createLike(like) {
        const statement = `
    INSERT INTO post_likes(id,idUser,postId)
    VALUES(?,?,?)
    `;
        await db.execute(statement, [like.id, like.idUser, like.postId]);
    },

    async likeExists(postId, idUser) {
        const statement = `
    SELECT * FROM post_likes
    WHERE postId = ? and idUser = ?
    `;
        const [rows] = await db.execute(statement, [postId, idUser]);
        return !!rows[0];
    },

    async deleteLikeByUserId(postId, idUser) {
        const statement = `
    DELETE FROM post_likes
    WHERE postId = ? and idUser = ?
    `;
        await db.execute(statement, [postId, idUser]);
    },

    async countLikesByPostId(postId) {
        const statement = `
    SELECT COUNT(*) as likes FROM post_likes
    WHERE postId = ?
    `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].likes;
    },

    async countCommentsByPostId(postId) {
        const statement = `
    SELECT COUNT(*) as comments FROM post_comments
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

    async updateComment(commentId, commentPayload) {
        const statement = `
    UPDATE post_comments
    SET comment = ?
    WHERE id = ?
    `;
        await db.execute(statement, [commentPayload.comment, commentId]);
    },

    async deleteComment(commentId) {
        const statement = `
    DELETE FROM post_comments
    WHERE id = ?
    `;
        await db.execute(statement, [commentId]);
    },
    */
};
