"use strict";

 juan
const dbService = require("../src/services/dbService.js");
=======
 ana
const dbService = require("../src/services/dbService.js");

module.exports = async (commentId, userId) => {
    const comment = await dbService.getCommentById(commentId);

    if (comment.userId !== userId) {
        throw new Error("Usuario no autorizado");
    }

    await dbService.deleteComment(commentId);
};
=======
const dbService = require("../src/database/services/dbService.js");
 main

module.exports = async (commentId, userId) => {
    const comment = await dbService.getCommentById(commentId);

    if (comment.userId !== userId) {
        throw new Error("Usuario no autorizado");
    }

    await dbService.deleteComment(commentId);
};
 juan
=======

 main
 main
