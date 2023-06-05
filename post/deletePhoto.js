'use strict';

const dbService = require("../src/services/dbService.js");
const fileService = require("../src/services/fileServices.js");
const errorService = require("../src/services/errorService.js");


function confirm(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
module.exports = async (postId, photoId, userId) => {
  const post = await dbService.getPostById(postId);
  confirm(post, "Post not found");
  confirm(post.userId === userId, "Unauthorized user");

  const photo = await dbService.getPhotoById(photoId);
  confirm(photo, "Photo not found");
  confirm(photo.postId === postId, "Invalid photo");

  await dbService.deletePhoto(photoId);
  await fileService.deletePhoto(photo);
};
