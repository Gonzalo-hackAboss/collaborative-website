"use strict";

const { generateUUID } = require("../src/services/cryptoServices.js");
const {
    checkUserPermission,
    saveComment,
} = require("../src/services/dbService.js");
const errorService = require("../src/services/errorService.js");

module.exports = async (postId, currentUserId, commentPayload) => {
    const hasPermission = await checkUserPermission(postId, currentUserId);
    if (!hasPermission) {
        /*throw new Error(
            "User doesn't have permission to add comments to this post"
        );*/
        errorService.unauthorizedUser();
    }

    const newComment = {
        postId,
        userId: currentUserId,
        comment: commentPayload.comment,
        id: generateUUID(),
    };

    await saveComment(newComment);
};
