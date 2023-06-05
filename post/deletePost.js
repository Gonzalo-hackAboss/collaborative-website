 juan
"use strict";
=======
 ana
"use strict";

//const errorService = require("../services/error-service.js");
const { getPostById, deletePost } = require("../src/services/dbService.js");

module.exports = async (postId, userId) => {
    if ((await getPostById(postId)).userId != userId) {
        return errorService.unauthorizedUser();
    }

    await deletePost(postId);
};
=======
'use strict';
 main

//const errorService = require("../services/error-service.js");
const { getPostById, deletePost } = require("../src/services/dbService.js");

module.exports = async (postId, userId) => {
    if ((await getPostById(postId)).userId != userId) {
        return errorService.unauthorizedUser();
    }

    await deletePost(postId);
};
 juan
=======




 main
 main
