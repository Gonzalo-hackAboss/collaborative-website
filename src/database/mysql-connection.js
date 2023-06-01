'use strict';

const mysql2 = require("mysql2/promise");

let pool = null;
module.exports = {
getConnection() {
    if (!pool) {
    const { localhost, webcolaborativa, proyectodos } = process.env;
    pool = mysql2.createPool({
        connectionLimit: 10,
        host: localhost,
        user: webcolaborativa,
        password: proyectodos,
    });
    }
    return pool;
},
};