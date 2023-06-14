"use strict";

const { Router, json } = require("express");
("use strict");

const addComment = require("../controllers/post/addComment.js");
const addPhoto = require("../controllers/post/addPhoto.js");
const createPost = require("../controllers/post/createPost.js");
const deleteComment = require("../controllers/post/deleteComment.js");
const deletePhoto = require("../controllers/post/deletePhoto.js");
const editComment = require("../controllers/post/editComment.js");
const editPost = require("../controllers/post/editPost.js");
const handleAsyncError = require("../services/handleAsyncError.js");
const authGuard = require("../middlewares/authGuard.js");
const sendResponse = require("../utils/sendResponse.js");
const listPosts = require("../controllers/post/listPosts.js");
const { searchByCategory } = require("../controllers/post/searchCategory.js");
// const { viewPostDetails } = require("../controllers/post/viewPostDetails.js");
const viewPostDetails = require("../controllers/post/viewPostDetails.js");
const { updatePost, deletePost } = require("../services/dbService.js");

const router = Router();

/*
 ****    POSTS   ****
 */

router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        const posts = await listPosts();
        sendResponse(res, posts);
    })
);

router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
        const post = await viewPostDetails(req); // revisar
        sendResponse(res, post);
    })
);

router.get(
    "/posts/search-post-categories",
    handleAsyncError(async (req, res) => {
        const search = await searchByCategory();
        sendResponse(res, search);
    })
);

router.post(
    "/posts",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        console.log("el usuario que llega al postRouter.js", req.currentUser);
        console.log("el req.body: ", req.body);
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = req.currentUser.token; // Obtiene el token de la propiedad token del objeto currentUser

        await createPost(req.body, token, res); // Pasa res como parámetro
        sendResponse(res, undefined, 201);
    })
);

router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);

/*
 **** VOTOS  ***
 */

router.post("/posts/:id/votes", async (req, res) => {
    console.log("has votado - esto luego se elimina");
    const { idPost } = req.params; // ID del post
    const { userVote } = req.body; // Valor del voto (true o false)
    const idUser = req.user.id; // ID del usuario autenticado
});

router.put(
    "/posts/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = req.currentUser.token; // Obtiene el token de la propiedad token del objeto currentUser
        await editPost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 200);
    })
);

router.delete(
    "/posts/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        if (!req.currentUser) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = req.currentUser.token; // Obtiene el token de la propiedad token del objeto currentUser
        await deletePost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 200);
    })
);

module.exports = router;

/* Acceder al Buscador, revisar cómo implementarlo */
// router.get(
//     "/posts/search",
//     handleAsyncError(async (req, res) => {
//         //Obtener todos los posts
//         const posts = await searchPosts(req.query);
//         sendResponse(res, posts);
//     })
// );

/*
 *** ESPERANDO A IMPLEMENTAR LAS FOTOS PARA PROBARLO
 */

// router.post(
//     "/posts/:id/photos",
//     authGuard,
//     // fileUpload(),
//     handleAsyncError(async (req, res) => {
//         //Agregar una nueva foto al post con id req.params.id
//         await addPhoto(req.params.id, req.currentUser.id, req.files.photo);
//         sendResponse(res);
//     })
// );

// ANTIGUO ROUTER POST A LA RUTA /POST
// router.post(
//     "/posts",
//     authGuard,
//     json(),
//     handleAsyncError(async (req, res) => {
//         await createPost(req.currentUser.id, req.body);
//         sendResponse(res, undefined, 201);
//     })
// );
