"use strict";

 ana
const { generateUUID } = require("../src/services/cryptoServices");
const dbService = require("../src/services/dbService.js");
const fileService = require("../src/services/fileServices.js");
const errorService = require("../src/services/errorService.js");

module.exports = async (postId, userId, photo) => {
    const id = generateUUID();

    const url = await fileService.processUploadedPostPhoto(postId, id, photo);

    const photoData = {
        id: id,
        imageURL: url,
        postId: postId,
    };

    await dbService.savePhoto(photoData);
};
=======
const { generateUUID } = require("../src/database/services/cryptoServices");
const dbService = require("../src/database/services/dbService.js");
const fileService = require("../src/database/services/fileServices.js");
const errorService = require("../src/database/services/errorService.js");

module.exports = async (postId, userId, photo) => {
  const id = generateUUID();

  const url = await fileService.processUploadedPostPhoto(postId, id, photo);

  const photoData = {
    id: id,
    imageURL: url,
    postId: postId,
  };

  await dbService.savePhoto(photoData);
};

 main
