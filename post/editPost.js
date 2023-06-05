"use strict";

 juan
const errorService = require("../src/services/errorService.js");
const { getPostById, updatePost } = require("../src/services/dbService.js");
=======
 ana
const errorService = require("../src/services/errorService.js");
const { getPostById, updatePost } = require("../src/services/dbService.js");

module.exports = async (postId, userId, postPayload) => {
    const oldPost = await getPostById(postId);

    if (oldPost.userId !== userId) {
        return errorService.unauthorizedUser();
    }

    const updatedPost = Object.assign({}, oldPost, postPayload);

    await updatePost(updatedPost);
=======
const errorService = require("../src/database/services/errorService.js");
const { getPostById, updatePost } = require("../src/database/services/dbService.js");
 main

module.exports = async (postId, userId, postPayload) => {
    const oldPost = await getPostById(postId);

    if (oldPost.userId !== userId) {
        return errorService.unauthorizedUser();
    }

    const updatedPost = Object.assign({}, oldPost, postPayload);

 juan
    await updatePost(updatedPost);
=======
  await updatePost(updatedPost);
 main
 main
};
