/**
 * Gestión de Errores inesperados
 * Recibe el status o el error 500
 * ** El Error 500 hace referencia a INTERNAL SERVER ERROR (Error interno)
 */

module.exports = (res, err) => {
    res.status(err.status ?? 500).json({
        success: false,
        error: {
            code: err.code ?? "UNEXPECTED_ERROR",
            msg: err.message ?? "¡Ha ocurrido un error inesperado!",
        },
    });
};

/* 
AÑADIR POSTERIORMENTE A APP.JS
app.use ((err, req, res, next) => {
    sendError(res, err);
})

IMPORTANTE hacer que SendError llame al archivo y lo requiera
*/
