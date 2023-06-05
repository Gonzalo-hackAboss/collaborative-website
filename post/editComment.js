'use strict'

const dbService = require("../src/database/services/dbService.js");
const errorService = require("../src/database/services/errorService.js");


module.exports = async (commentId, userId, commentPayload) => {
  
  const comment = await dbService.getCommentById(commentId);
  const isUserAuthorized = comment.userId === userId;
  if (!isUserAuthorized) {
    throw new Error("Usuario no autorizado");
  }
  
  await dbService.updateComment(commentId, commentPayload);
};
