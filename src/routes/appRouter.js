"use strict";

const { Router } = require("express");

const postsRouter = require("./postsRouter.js");
const userRouter = require("./userRouter.js");


/**
 * Creación del enrutador principal,
 * Se importan y se utilizan los enrutadores de usuarios (userRouter) y publicaciones (postsRouter),
 * para definir las rutas y controladores correspondientes.
 */
const router = Router();
router.use(userRouter);
router.use(postsRouter);


module.exports = router;
