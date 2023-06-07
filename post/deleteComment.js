"use strict";

const dbService = require("../src/services/dbService.js");
const errorService = require("../src/services/errorService.js");
module.exports = async (commentId, userId) => {
    const comment = await dbService.getCommentById(commentId);

    if (comment.userId !== userId) {
        // throw new Error("Usuario no autorizado");
        return errorService.unauthorizedUser();
    }

    await dbService.deleteComment(commentId);
};
