"use strict";

const errorService = require("../../services/errorService.js");
const { getPostById, updatePost } = require("../../services/dbService.js");

// Función para editar un post
module.exports = async (postId, userId, postPayload) => {
    // Obtener el post por su ID
    const oldPost = await getPostById(postId);

    // Verificar si el usuario actual es el propietario del post
    if (oldPost.userId !== userId) {
        // Si el usuario no está autorizado, enviar un error personalizado utilizando el servicio de errores
        return errorService.unauthorizedUser();
    }

    // Crear una copia actualizada del post
    const updatedPost = Object.assign({}, oldPost, postPayload);

    // Actualizar el post en la base de datos
    await updatePost(updatedPost);
};
