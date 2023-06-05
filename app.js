"use strict";

require("dotenv").config();
const express = require("express");
const path = require("path");

//const getComments = require('./post/getComments.js');
const appRouter = require("./src/routes/appRouter.js");
const sendError = require("./utils/sendError.js");
const notFound = require("./src/services/errorService.js");


const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server iniciado en el puerto " + PORT);
});


app.use(appRouter);
/* Error 404 */

app.use((req, res, next) => {
    notFound();
});

/* Errores 
sendError();
*/
