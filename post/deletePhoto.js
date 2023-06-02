'use strict';

const fs = require('fs');
const path = require('path');

function deletephoto(imagePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(imagePath, (err) => {
      if (err) {
        reject(new Error('Error al eliminar la imagen.'));
      } else {
        resolve('Imagen eliminada correctamente.');
      }
    });
  });
}


const imagePath = '';

deletephoto(imagePath)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error('Error al eliminar la imagen:', error.message);
  });

module.exports = deletephoto;
