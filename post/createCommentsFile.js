"use strict";

const fs = require("fs");

function createCommentsFile() {
    return new Promise((resolve, reject) => {
        const initialData = "[]";

        fs.writeFile("comments.json", initialData, "utf8", (err) => {
            if (err) {
                reject(new Error('Error al crear el archivo "comments.json".'));
            } else {
                resolve('Archivo "comments.json" creado correctamente.');
            }
        });
    });
}

module.exports = createCommentsFile;
