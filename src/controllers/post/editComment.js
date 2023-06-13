"use strict";

const dbService = require("../../services/dbService.js");
const errorService = require("../../services/errorService.js");


module.exports = async (commentId, userId, commentPayload) => {
    const comment = await dbService.getCommentById(commentId);
    const isUserAuthorized = comment.userId === userId;
    if (!isUserAuthorized) {
        return errorService.unauthorizedUser();
    }

    await dbService.updateComment(commentId, commentPayload);
};
