"use strict";

require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const appRouter = require("./src/routes/appRouter.js");
const sendError = require("./src/utils/sendError.js");
const validateToken = require("./src/middlewares/validateToken.js");


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(fileUpload());
app.use(morgan("dev"));
app.use(validateToken);
app.use(appRouter);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        error: {
            code: err.code || "UNEXPECTED_ERROR",
            message: err.message || "¡Ha ocurrido un error inesperado!",
        },
    });
});

// Middleware para manejar las solicitudes a endpoints desconocidos
app.use((req, res) => {
    sendError(res, {
        status: 404,
        code: "UNKNOWN_ENDPOINT",
        message: `Endpoint desconocido: ${req.method} ${req.path}`,
    });
});


app.listen(PORT, () => {
    console.log("Server iniciado en el puerto " + PORT);
});
