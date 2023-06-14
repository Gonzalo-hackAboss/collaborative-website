"use strict";

const dbService = require("../../services/dbService.js");
const errorService = require("../../services/errorService.js");

// Función para eliminar un comentario
module.exports = async (commentId, userId) => {
    // Obtener el comentario por su ID
    const comment = await dbService.getCommentById(commentId);

    // Verificar si el usuario actual es el propietario del comentario
    if (comment.userId !== userId) {
        // Si el usuario no está autorizado, lanzar un error o enviar un error personalizado
        // throw new Error("Usuario no autorizado");
        return errorService.unauthorizedUser();
    }

    // Eliminar el comentario de la base de datos
    await dbService.deleteComment(commentId);
};
