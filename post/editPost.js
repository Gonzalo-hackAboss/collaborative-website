'use strict'

//const errorService = require("../services/error-service.js");
const { getPostById, updatePost } = require("../services/dbService.js");

module.exports = async (postId, userId, postPayload) => {
  const oldPost = await getPostById(postId);

  if (oldPost.userId !== userId) {
    return errorService.unauthorizedUser();
  }

  const updatedPost = Object.assign({}, oldPost, postPayload);

  await updatePost(updatedPost);
};
