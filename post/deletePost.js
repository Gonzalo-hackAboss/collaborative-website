"use strict";



const errorService = require("../src/services/errorService.js");
const { getPostById, deletePost } = require("../src/services/dbService.js");

module.exports = async (postId, userId) => {
    if ((await getPostById(postId)).userId != userId) {
        return errorService.unauthorizedUser();
    }

    await deletePost(postId);
};

