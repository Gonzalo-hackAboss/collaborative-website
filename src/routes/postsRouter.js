const { Router, json } = require("express");
const fileUpload = require("express-fileupload");

const addComment = require("../../post/addComment.js");
const addPhoto = require("../../post/addPhoto.js");
const createPost = require("../../post/createPost.js");
const deleteComment = require("../../post/deleteComment.js");
const deletePhoto = require("../../post/deletePhoto.js");
const deletePost = require("../../post/deletePost.js");
const editComment = require("../../post/editComment.js");
const editPost = require("../../post/editPost.js");
const handleAsyncError = require("../services/handleAsyncError.js");
const authGuard = require("../../middlewares/authGuard.js");

/* Preparación de futuras rutas requeridas */
// const listPosts = require(".../../../post/list-posts.js");
// const viewPostDetail = require("../../../post/view-post-detail.js");
// const sendResponse = require(".emove-comment.js");
// const authGuard = require("../../../post/auth-guard.js");
// const searchPosts = require("../../../post/search-posts.js");

const router = Router();

/*
 ****    GET     ****
 */
router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        //Obtener todos los posts
        const posts = await listPosts();
        sendResponse(res, posts);
    })
);

router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
        // Obtener el post con id req.params.id
        const post = await viewPostDetail(req.params.id);
        sendResponse(res, post);
    })
);

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
 ****    POST    ****
 */

    router.post(
        "/posts",
        authGuard,
        json(),
        handleAsyncError(async (req, res) => {
            // Crear un nuevo post
            await createPost(req.currentUser.id, req.body);
            sendResponse(res, undefined, 201); // revisar el envío de respuesta
        })
    );

//router.post(
 //   "/posts/:id/like",
 //   authGuard,
  //  handleAsyncError(async (req, res) => {
 //       //Hacer toggle del like en el post con id req.params.id
 //       await toggleLike(req.params.id, req.currentUser.id);
  //      sendResponse(res);
 //   })
//);

router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        //Agregar un nuevo comentario al post con id req.params.id
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);

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

// module.exports = router;
