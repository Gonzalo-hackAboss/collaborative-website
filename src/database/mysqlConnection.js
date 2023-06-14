"use strict";

const mysql2 = require("mysql2/promise");


let pool = null;

/**
 * Crea un pool de conexiones de MySQL utilizando la configuración proporcionada.
 * 
 */
function createPool(database) {
    const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;
    return mysql2.createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        database: database,
        password: MYSQL_PASSWORD,
    });
}

/**
 * Obtiene la conexión del pool. Si el pool no existe, crea uno utilizando la base de datos especificada.
 * 
 */
function getConnection() {
    if (!pool) {
        const { MYSQL_DATABASE } = process.env;
        pool = createPool(MYSQL_DATABASE);
    }
    return pool;
}

module.exports = {
    createPool,
    getConnection,
};
