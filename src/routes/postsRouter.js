"use strict";

const { Router, json } = require("express");

const addComment = require("../controllers/post/addComment.js");
const createPost = require("../controllers/post/createPost.js");
const deleteComment = require("../controllers/post/deleteComment.js");
const editComment = require("../controllers/post/editComment.js");
const editPost = require("../controllers/post/editPost.js");
const handleAsyncError = require("../services/handleAsyncError.js");
const authGuard = require("../middlewares/authGuard.js");
const sendResponse = require("../utils/sendResponse.js");
const listPosts = require("../controllers/post/listPosts.js");
const lastPosts = require("../controllers/post/lastPost.js");
const viewPostDetails = require("../controllers/post/viewPostDetails.js");
const { updatePost, deletePost } = require("../services/dbService.js");

const router = Router();

// Obtener todos los posts
router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        const fullPost = await lastPosts();
        const posts = await listPosts();
        const allPosts = [...fullPost, ...posts];
        sendResponse(res, allPosts);
    })
);

// Obtener detalles de un post específico
router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
        const post = await viewPostDetails(req); 
        sendResponse(res, post);
    })
);


// Crear un nuevo post
router.post(
    "/posts",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = req.currentUser.token;
        await createPost(req.body, token, res);
        sendResponse(res, undefined, 201);
    })
);

// Agregar un comentario a un post
router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);

// Agregar un voto a un post
router.post("/posts/:id/votes", async (req, res) => {
    const { idPost } = req.params;
    const { userVote } = req.body;
    const idUser = req.user.id;
    
});

// Editar un post existente
router.put(
    "/posts/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = req.currentUser.token;
        await editPost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 200);
    })
);

// Eliminar un post existente
router.delete(
    "/posts/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = req.currentUser.token;
        await deletePost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 200);
    })
);

module.exports = router;
