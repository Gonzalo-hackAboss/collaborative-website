/**
 * Envío de respuesta de status OK.
 * Si recibes este objeto, es que tu petición ha sido completada con éxito.
 */
const sendResponse = (res, data, status = 200) => {
    res.status(status).json({
        success: true,
        data,
    });
};

module.exports = sendResponse;
