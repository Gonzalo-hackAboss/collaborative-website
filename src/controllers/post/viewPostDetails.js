"use strict";

const handleAsyncError = require("../../services/handleAsyncError");
const sendResponse = require("../../utils/sendResponse");
const { getPostById } = require("../../services/dbService.js");

/**
 * Maneja la solicitud para obtener los detalles de un post por su ID.
 * 
 */
module.exports = async (req, res) => {
    return await getPostById(req.params.id); // Obtiene los detalles del post por su ID utilizando la función getPostById del módulo dbService.
};
