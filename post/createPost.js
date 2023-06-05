
const generateUUID = require("../src/services/cryptoServices.js");
const { savePost } = require("../src/services/dbService.js");

module.exports = async (currentUserId, { title, description }) => {
    const newPost = {
        title,
        description,
        userId: currentUserId,
        id: generateUUID(),
    };

    await savePost(newPost);
};
