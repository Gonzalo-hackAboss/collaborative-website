"use strict";
const express = require("express");
const app = express();

module.exports = (req, res, next) => {
    res.status(404).json({ error: "404, página no encontrada" });
};
