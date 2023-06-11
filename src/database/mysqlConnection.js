'use strict';

const mysql2 = require("mysql2/promise");

let pool = mysql2.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MSQYL_DATABASE,
});

module.exports = {
    getConnection() {
        return pool;
    },
};
