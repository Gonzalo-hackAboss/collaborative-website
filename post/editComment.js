"use strict";

const dbService = require("../src/services/dbService.js");
const errorService = require("../src/services/errorService.js");

module.exports = async (commentId, userId, commentPayload) => {
    const comment = await dbService.getCommentById(commentId);
    const isUserAuthorized = comment.userId === userId;
    if (!isUserAuthorized) {
        return errorService.unauthorizedUser();
    }

    await dbService.updateComment(commentId, commentPayload);
};
