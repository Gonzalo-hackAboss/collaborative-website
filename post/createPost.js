'use strict';

const generateUUID = require("../src/database/services/cryptoServices.js");
const { savePost } = require("../src/database/services/dbService.js");

module.exports = async (currentUserId, { title, description }) => {
  const newPost = {
    title,
    description,
    userId: currentUserId,
    id: generateUUID(),
  };

  await savePost(newPost);
};

