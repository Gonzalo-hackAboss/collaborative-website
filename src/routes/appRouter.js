// Se exporta enrutador de express
const { Router } = require("express");

// Se le agregan las rutas

const usersRouter = require("../routes/postsRouter.js");
const postsRouter = require("../routes/userRouter.js");

// // Se crea el enrutador para gestionar las rutas especificadas
const router = Router();
router.use(usersRouter);
router.use(postsRouter);

module.exports = router;
