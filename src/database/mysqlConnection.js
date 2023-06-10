"use strict";
require("dotenv").config();
const mysql2 = require("mysql2/promise");

let pool = mysql2.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MSQYL_DATABASE,
    port: 3306,
});

module.exports = {
    getConnection() {
        return pool;
    },
};
