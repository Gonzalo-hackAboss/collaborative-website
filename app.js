"use strict";

require("dotenv").config();
const express = require("express");
const path = require("path");
const createPost = require("./post/createPost.js");
const addPhoto = require("./post/addPhoto.js");
//const deletePost = require("./post/deletePost.js");
const deletePhoto = require("./post/deletePhoto.js");
const addComment = require("./post/addComment.js");
const editComment = require("./post/editComment.js");
const createCommentsFile = require("./post/createCommentsFile.js");
//const getComments = require('./post/getComments.js');
const router = require("./src/database/routes/appRouter.js");
const sendError = require("./utils/sendError.js");
const notFound = require("./middlewares/notFound.js");





const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server iniciado en el puerto " + PORT);
});

/* Error 404 */

app.use((req, res, next) => {
    notFound();
});

/* Errores 
sendError();
*/
