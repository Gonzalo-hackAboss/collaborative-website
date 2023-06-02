'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const createPost = require('./post/createPost.js');
const addPhoto = require('./post/addPhoto.js');
const editPost = require('./post/editPost.js');
const deletePost = require('./post/deletePost.js');
const deletePhoto = require('./post/deletePhoto.js');
const addComment = require('./post/addComment.js');
const editComment = require('./post/editComment.js');
const createCommentsFile = require('./post/createCommentsFile.js');
//const getComments = require('./post/getComments.js');

const title = 'first post';
const description = 'bla bla bla';
const idUser = 1;
const category = 'deportes';

createPost(title, description, idUser, category);

const postId = 123; 
const newTitle = 'update tittle';
const newDescription = 'update tittle';
const newCategory = 'update';

editPost(postId, newTitle, newDescription, idUser, newCategory);

const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server iniciado en el puerto ' + PORT);
});
