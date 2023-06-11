const generateUUID = require("../../services/cryptoServices.js");
const { savePost } = require("../../services/dbService.js");

module.exports = async (currentUserId, { title, description }) => {
    const newPost = {
        id: generateUUID(),
        userId: currentUserId,
        title,
        description,
    };

    await savePost(newPost);
};
