'use strict'

const validateToken = require("../../middlewares/validateToken.js");
const { generateUUID, parseJWT } = require("../../services/cryptoServices.js");
const { savePost } = require("../../services/dbService.js");
const sendError = require("../../utils/sendError.js");


// Función para crear un nuevo post
module.exports = async (data, token, res) => {
    try {
        // Verificar la autenticación del usuario a través del token
        const user = parseJWT(token);

        console.log("user: ", user);

        if (!user) {
            throw new Error("Usuario no autenticado");
        }
        if (!token) {
            throw new Error("INVALID TOKEN");
        }
        // Obtener los datos del post
        const { title, description } = data;

        // Validar que se proporcionen un título y una descripción para el post
        if (!title || !description) {
            throw new Error(
                "Debe proporcionar un título y una descripción para el post"
            );
        }
        // Crear un nuevo post con los datos proporcionados
        const newPost = {
            id: generateUUID(),
            idUser: user.id,
            title,
            description: description,
        };
        // Guardar el post en la base de datos
        await savePost(newPost);

        return {
            success: true,
            message: "Post creado exitosamente",
        };
    } catch (error) {
        // Enviar el error al cliente
        sendError(res, error);
    }
};
