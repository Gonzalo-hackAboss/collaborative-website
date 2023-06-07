'use strict';

const { Router } = require("express");
const postsRouter = require("../routes/postsRouter.js");
const userRouter = require("../routes/userRouter.js");

const router = Router();

router.use(userRouter);
router.use(postsRouter);

module.exports = router;
