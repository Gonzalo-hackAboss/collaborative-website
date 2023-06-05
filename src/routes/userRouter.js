"use strict";
const { Router } = require("express");
const registerUser = require("../user/registerUser.js");
const loginUser = require("../user/loginUser.js");
const sendResponse = require("../utils/sendResponse.js");
// const authGuard = require("../middlewares/authGuard.js");

const router = Router();

router.post("/users/register", json(), async (req, res) => {
    const result = await registerUser(req.body);
    res.json(result);
});

router.post("/users/login", json(), async (req, res) => {
    //Loguea el usuario y devuelve un token de login
    const token = await loginUser(req.body);
    sendResponse(res, {
        token,
    });
});

router.get("/users/:id", (req, res) => {
    // authGuard, entre "," y "(requ,"

    // Obtener el usuario con id req.params.id
    res.send("Detalle usuario");
});

router.get("/users", (req, res) => {
    // authGuard, entre "," y "(requ,"

    // Obtener todos los usuarios (solo para admins)
    res.send("Listado usuarios");
});

router.patch("/users/:id", json(), (req, res) => {
    // authGuard, entre "," y "json("

    // Modificar datos del usuario (solo para el propio usuario, o para el admin)
    res.json(req.body);
});

 juan
module.exports = router;
=======
 ana
module.exports = router;
=======
module.exports = router;
 main
 main
