"use strict";
const express = require("express");
const app = express();

module.exports = function (req, res, next) {
    res.status(404).json({ error: "404, página no encontrada" });
};
