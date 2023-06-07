const { Router, json } = require("express");

const addComment = require("../controllers/post/addComment.js");
// const addPhoto = require("../../post/addPhoto.js");
const createPost = require("../controllers/post/createPost.js");
const deleteComment = require("../controllers/post/deleteComment.js");
const deletePhoto = require("../controllers/post/deletePhoto.js");
const deletePost = require("../controllers/post/deletePost.js");
const editComment = require("../controllers/post/editComment.js");
const editPost = require("../controllers/post/editPost.js");
const handleAsyncError = require("../services/handleAsyncError.js");
const authGuard = require("../middlewares/authGuard.js");
const sendResponse = require("../utils/sendResponse.js");

const router = Router();

/*
 ****    GET     ****
 */
// router.get(
//     "/posts",
//     handleAsyncError(async (req, res) => {
//         //Obtener todos los posts
//         const posts = await listPosts();
//         sendResponse(res, posts);
//     })
// );

router.get("/posts", (req, res) => {
    sendResponse();
});

// router.get(
//     "/posts/:id",
//     handleAsyncError(async (req, res) => {
//         // Obtener el post con id req.params.id
//         const post = await viewPostDetail(req.params.id);
//         sendResponse(res, post);
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

// router.post(
//     "/posts/:id/comments",
//     authGuard,
//     json(),
//     handleAsyncError(async (req, res) => {
//         //Agregar un nuevo comentario al post con id req.params.id
//         await addComment(req.params.id, req.currentUser.id, req.body);
//         sendResponse(res, undefined, 201);
//     })
// );

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

//router.post(
//   "/posts/:id/like",
//   authGuard,
//  handleAsyncError(async (req, res) => {
//       //Hacer toggle del like en el post con id req.params.id
//       await toggleLike(req.params.id, req.currentUser.id);
//      sendResponse(res);
//   })
//);

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
