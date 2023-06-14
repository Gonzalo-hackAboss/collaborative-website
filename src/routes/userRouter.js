"use strict";

const { Router } = require("express");
const { json } = require("express");

const registerUser = require("../controllers/user/registerUser.js");
const loginUser = require("../controllers/user/loginUser.js");
const sendResponse = require("../utils/sendResponse.js");
const sendError = require("../utils/sendError.js");
const authGuard = require("./../middlewares/authGuard.js");
const handleAsyncError = require("../services/handleAsyncError.js");
const validateBody = require("../middlewares/validateBody.js");
const registerPayload = require("../validators/registerPayload.js");

const router = Router();

// Obtener noticias
router.get("/news", (req, res) => {
    sendResponse(res);
});

// Registrar un nuevo usuario
router.post(
    "/users/register",
    json(),
    handleAsyncError(async (req, res) => {
        await registerUser(req.body);
        sendResponse(res);
    })
);

// Iniciar sesión de usuario
router.post(
    "/users/login",
    json(),
    handleAsyncError(async (req, res) => {
        const token = await loginUser(req.body);
        sendResponse(res, { token });
    })
);

// Obtener detalles de un usuario específico
router.get("/users/:id", authGuard, (req, res) => {
    res.send("Detalle usuario");
});

// Obtener listado de usuarios
router.get("/users", authGuard, (req, res) => {
    res.send("Listado usuarios");
});

// Actualizar información de un usuario
router.patch("/users/:id", authGuard, json(), (req, res) => {
    res.json(req.body);
});

module.exports = router;
