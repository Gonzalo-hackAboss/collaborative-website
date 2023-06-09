"use strict";
const { Router } = require("express");
const { json } = require("express");

const registerUser = require("../controllers/user/registerUser.js");
const loginUser = require("../controllers/user/loginUser.js");
const sendResponse = require("../utils/sendResponse.js");
const sendError = require("../utils/sendError.js");
const authGuard = require("./../middlewares/authGuard.js");

const router = Router();

router.get("/news", (req, res) => {
    console.log("Hola");
    sendResponse(res);
});

router.post("/users/register", json(), async (req, res) => {
    try {
        const result = await registerUser(req.body);
        sendResponse(res, result);
    } catch (error) {
        sendError(res, error);
    }
});

router.post("/users/login", json(), async (req, res) => {
    try {
        const token = await loginUser(req.body);
        sendResponse(res, { token });
    } catch (error) {
        sendError(res, error);
    }
});

router.get("/users/:id", authGuard, (req, res) => {
    // Obtener el usuario con id req.params.id
    res.send("Detalle usuario");
});

router.get("/users", authGuard, (req, res) => {
    // Obtener todos los usuarios (solo para admins)
    res.send("Listado usuarios");
});

router.patch("/users/:id", authGuard, json(), (req, res) => {
    // Modificar datos del usuario (solo para el propio usuario, o para el admin)
    res.json(req.body);
});

module.exports = router;
