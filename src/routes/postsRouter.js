'use strict'

const { Router, json } = require("express");
'use strict'

const addComment = require("../controllers/post/addComment.js");
const createPost = require("../controllers/post/createPost.js");
const deleteComment = require("../controllers/post/deleteComment.js");
const deletePost = require("../controllers/post/deletePost.js");
const editComment = require("../controllers/post/editComment.js");
const editPost = require("../controllers/post/editPost.js");
const handleAsyncError = require("../services/handleAsyncError.js");
const authGuard = require("../middlewares/authGuard.js");
const sendResponse = require("../utils/sendResponse.js");
const listPosts = require("../controllers/post/listPosts.js");
const { viewPostDetails } = require("../controllers/post/viewPostDetails.js");




const router = Router();




// Obtener todas las publicaciones
router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        const posts = await listPosts();
        sendResponse(res, posts);
    })
);


// Obtener detalles de una publicación por su ID
router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
        const post = await viewPostDetails(req.params.id); 
        sendResponse(res, post);
    })
);

// Crear una nueva publicación
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

        const token = req.currentUser.token; 

        await createPost(req.body, token, res); 
        sendResponse(res, undefined, 201);
    })
);

// Agregar un comentario a una publicación
router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);

// Votar en una publicación
router.post("/posts/:id/votes", async (req, res) => {
    console.log("has votado - esto luego se elimina");
    const { idPost } = req.params;
    const { userVote } = req.body; 
    const idUser = req.user.id; 
});


module.exports = router;

