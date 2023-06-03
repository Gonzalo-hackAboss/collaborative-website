// Se exporta enrutador de express
const { Router } = require("express");

// Se le agregan las rutas
 juan
const usersRouter = require("./usersRouter.js");
const postsRouter = require("./postsRouter.js");
=======
//const usersRouter = require("./users-router.js");
//const postsRouter = require("./posts-router.js");

 main

// Se crea el enrutador para gestionar las rutas especificadas
const router = Router();

 juan
router.use(usersRouter);
router.use(postsRouter);
=======
//router.use(usersRouter);
//router.use(postsRouter);
 main

module.exports = router;
