"use strict";

const { getConnection } = require("../database/mysqlConnection.js");

const db = getConnection();

module.exports = {
    async saveUser(user) {
        const statement = `
        INSERT INTO users(id, name, email, password, birthDate, country, acceptedTOS, emailValidated)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
      `;
        await db.execute(statement, Object.values(user));
    },

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
        return usersTable.filter(({ emailValidated }) => emailValidated);
    },

    async saveValidationCode(code) {
        const statement = `
        INSERT INTO validation_codes(id, userId, code)
        VALUES(?, ?, ?)
      `;
        await db.execute(statement, Object.values(code));
    },

    async getAllUsers() {
        return usersTable;
    },

    async getAllPosts() {
        const statement = `
        SELECT
          p.id,
          p.userId,
          p.title,
          p.description,
          COALESCE(l.like_count, 0) AS likes,
          COALESCE(c.comment_count, 0) AS comments
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
        return rows;
    },

    async savePost(post) {
        const statement = `
        INSERT INTO posts(id, userId, title, description)
        VALUES(?, ?, ?, ?)
      `;
        await db.execute(statement, Object.values(post));
    },

    async updatePost(post) {
        const statement = `
        UPDATE posts
        SET title = ?, description = ?
        WHERE id = ?
      `;
        await db.execute(statement, Object.values(post).slice(2));
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
        INSERT INTO post_comments(id, userId, postId, comment)
        VALUES(?, ?, ?, ?)
      `;
        await db.execute(statement, Object.values(postComment));
    },

    async createLike(like) {
        const statement = `
        INSERT INTO post_likes(id, userId, postId)
        VALUES(?, ?, ?)
      `;
        await db.execute(statement, Object.values(like));
    },

    async likeExists(postId, userId) {
        const statement = `
        SELECT * FROM post_likes
        WHERE postId = ? AND userId = ?
      `;
        const [rows] = await db.execute(statement, [postId, userId]);
        return !!rows[0];
    },

    async deleteLikeByUserId(postId, userId) {
        const statement = `
        DELETE FROM post_likes
        WHERE postId = ? AND userId = ?
      `;
        await db.execute(statement, [postId, userId]);
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
        await db.execute(statement, Object.values(commentPayload).reverse());
    },

    async deleteComment(commentId) {
        const statement = `
        DELETE FROM post_comments
        WHERE id = ?
      `;
        await db.execute(statement, [commentId]);
    },

    async getCommentById(commentId) {
        const statement = `
        SELECT * FROM post_comments
        WHERE id = ?
      `;
        const [rows] = await db.execute(statement, [commentId]);
        return rows[0];
    },

    async savePhoto(photo) {
        const statement = `
        INSERT INTO post_photos(id, postId, imageURL)
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
        FROM posts
        WHERE id = ? AND userId = ?
      `;
        const [rows] = await db.execute(statement, [postId, userId]);

        return rows.length > 0;
    },
};
