"use strict";

const dbService = require("../../services/dbService.js");
const errorService = require("../../services/errorService.js");

// Función para editar un comentario
module.exports = async (commentId, userId, commentPayload) => {
    // Obtener el comentario por su ID
    const comment = await dbService.getCommentById(commentId);

    // Verificar si el usuario actual está autorizado para editar el comentario
    const isUserAuthorized = comment.userId === userId;
    if (!isUserAuthorized) {
        // Si el usuario no está autorizado, enviar un error personalizado utilizando el servicio de errores
        return errorService.unauthorizedUser();
    }

    // Actualizar el comentario en la base de datos
    await dbService.updateComment(commentId, commentPayload);
};
