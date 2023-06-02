'use strict';

const mysql2 = require("mysql2/promise");

let pool = null;
module.exports = {
getConnection() {
    if (!pool) {
    const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;
    pool = mysql2.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
    });
    }
    return pool;
},
};