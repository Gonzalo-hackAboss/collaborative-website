// Se exporta enrutador de express
const { Router } = require("express");

// Se le agregan las rutas
const usersRouter = require("./users-router.js");
const postsRouter = require("./posts-router.js");

// Se crea el enrutador para gestionar las rutas especificadas
const router = Router();

router.use(usersRouter);
router.use(postsRouter);

module.exports = router;
