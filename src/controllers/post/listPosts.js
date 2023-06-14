"use strict";

const { getAllPosts } = require("../../services/dbService.js");

/**
 * Obtiene todos los posts.
 * 
 */
module.exports = async () => {
    return await getAllPosts();
};
