"use strict";

const { getLastPost } = require("../../services/dbService.js");

/**
 * Obtiene el último post creado.
 * 
 */
module.exports = async () => {
    return await getLastPost();
};
