 juan
"use strict";
=======
 ana
"use strict";

const { generateUUID } = require("../src//services/cryptoServices.js");
const {
    checkUserPermission,
    saveComment,
} = require("../src/services/dbService.js");

module.exports = async (postId, currentUserId, commentPayload) => {
    const hasPermission = await checkUserPermission(postId, currentUserId);
    if (!hasPermission) {
        throw new Error(
            "User doesn't have permission to add comments to this post"
        );
    }

    const newComment = {
        postId,
        userId: currentUserId,
        comment: commentPayload.comment,
        id: generateUUID(),
    };

    await saveComment(newComment);
=======
'use strict';
 main

const { generateUUID } = require("../src//services/cryptoServices.js");
const {
    checkUserPermission,
    saveComment,
} = require("../src/services/dbService.js");

module.exports = async (postId, currentUserId, commentPayload) => {
    const hasPermission = await checkUserPermission(postId, currentUserId);
    if (!hasPermission) {
        throw new Error(
            "User doesn't have permission to add comments to this post"
        );
    }

    const newComment = {
        postId,
        userId: currentUserId,
        comment: commentPayload.comment,
        id: generateUUID(),
    };

 juan
    await saveComment(newComment);
=======
  const newComment = {
    postId,
    userId: currentUserId,
    comment: commentPayload.comment,
    id: generateUUID(),
  };

  await saveComment(newComment);
 main
 main
};
