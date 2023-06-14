"use strict";

const validateToken = require("../../middlewares/validateToken.js");
const { generateUUID, parseJWT } = require("../../services/cryptoServices.js");
const { savePost } = require("../../services/dbService.js");
const sendError = require("../../utils/sendError.js");

module.exports = async (data, token, res) => {
    try {
        console.log("data: ", data);
        const user = parseJWT(token);

        if (!user) {
            throw new Error("Usuario no autenticado");
        }

        if (!token) {
            throw new Error("INVALID TOKEN");
        }
        const { title, entradilla, description } = data;

        if (!title || !entradilla || !description) {
            throw new Error(
                "Debe proporcionar un título y una descripción para el post"
            );
        }
        console.log("Titulo: ", data.title);
        console.log("Entradilla: ", data.entradilla);
        console.log("Descripcion: ", data.description);

        const newPost = {
            id: generateUUID(),
            idUser: user.id,
            title: data.title,
            entradilla: data.entradilla,
            description: data.description,
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
