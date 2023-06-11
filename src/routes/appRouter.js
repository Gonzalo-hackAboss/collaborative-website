"use strict";

const { Router } = require("express");

const postsRouter = require("./postsRouter.js");
const userRouter = require("./userRouter.js");

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postsRouter);

module.exports = router;
