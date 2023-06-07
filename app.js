"use strict";

require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

//const getComments = require('./post/getComments.js');
const appRouter = require("./src/routes/appRouter.js");
const sendError = require("./src/utils/sendError.js");

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(fileUpload());
app.use(morgan("dev"));
app.use(appRouter);


//middleware de error
 app.use((err, req, res, next) => {
    console.error(err);
     sendError(res, err);
 });

 //middleware de ruta no encontrada


 app.use((req, res) => {
    sendError(res, {
        status: 404,
        code: "UNKNOWN_ENDPOINT",
         message: `Endpoint desconocido: ${req.method} ${req.path}`,     });
});

/* Error 404 */

//app.use((req, res, next) => {
 //   console.log(notFound);
//});

/* Errores 
sendError();
*/


app.listen(PORT, () => {
    console.log("Server iniciado en el puerto " + PORT);
});