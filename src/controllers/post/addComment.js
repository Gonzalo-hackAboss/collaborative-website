"use strict";

const { generateUUID } = require("../../services/cryptoServices");
const { saveComment } = require("../../services/dbService.js");
const errorService = require("../../services/errorService.js");


// Función para agregar un comentario a una publicación
module.exports = async (postId, currentUserId, commentPayload) => {
    const newComment = {
        postId,
        userId: currentUserId,
        comment: commentPayload.comment,
        id: generateUUID(),
    };

    await saveComment(newComment);
};
