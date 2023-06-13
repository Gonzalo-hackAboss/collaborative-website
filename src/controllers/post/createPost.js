'use strict'

const validateToken = require("../../middlewares/validateToken.js");
const { generateUUID, parseJWT } = require("../../services/cryptoServices.js");
const { savePost } = require("../../services/dbService.js");
const sendError = require("../../utils/sendError.js");

module.exports = async (data, token, res) => {
    try {
        const user = parseJWT(token);

        console.log("user: ", user);

        if (!user) {
            throw new Error("Usuario no autenticado");
        }
        if (!token) {
            throw new Error("INVALID TOKEN");
        }
        const { title, description } = data;

        if (!title || !description) {
            throw new Error(
                "Debe proporcionar un título y una descripción para el post"
            );
        }
        const newPost = {
            id: generateUUID(),
            idUser: user.id,
            title,
            description: description,
        };
        await savePost(newPost);

        return {
            success: true,
            message: "Post creado exitosamente",
        };
    } catch (error) {
        sendError(res, error);
    }
};
