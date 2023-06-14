"use strict";

const errorService = require("../../services/errorService.js");
const { getPostById, deletePost } = require("../../services/dbService.js");

// Función para eliminar un post
module.exports = async (postId, userId) => {
    // Obtener el post por su ID
    const post = await getPostById(postId);

    // Verificar si el usuario actual es el propietario del post
    if (post.userId != userId) {
        // Si el usuario no está autorizado, enviar un error personalizado utilizando el servicio de errores
        return errorService.unauthorizedUser();
    }

    // Eliminar el post de la base de datos
    await deletePost(postId);
};
