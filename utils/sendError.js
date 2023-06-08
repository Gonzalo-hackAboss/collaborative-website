/**
 * Gestión de Errores inesperados
 * Recibe el status o el error 500
 * ** El Error 500 hace referencia a INTERNAL SERVER ERROR (Error)
 */

module.exports = (res, error) => {
    
    res.status(error.status ?? 500).json({
        success: false,
        error: {
            code: error.code ?? "UNEXPECTED_ERROR",
            msg: error.message ?? "¡Ha ocurrido un error inesperado!",
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
