'use strict';

//const errorService = require("../services/error-service.js");
const { getPostById, deletePost } = require("../src/database/services/dbService.js");

module.exports = async (postId, userId) => {
  if ((await getPostById(postId)).userId != userId) {
    return errorService.unauthorizedUser();
  }

  await deletePost(postId);
};




