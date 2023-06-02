'use strict';

const fs = require('fs');
const path = require('path');


function saveImage(imageFile, postId) {
  return new Promise((resolve, reject) => {
    const tempPath = imageFile.path;
    const ext = path.extname(imageFile.originalname).toLowerCase();
    const targetPath = path.join(__dirname, 'postImages', `${postId}${ext}`);

    
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
      
      fs.rename(tempPath, targetPath, (err) => {
        if (err) {
          reject(new Error('Error al guardar la imagen en el servidor.'));
        } else {
          resolve(targetPath);
        }
      });
    } else {
      
      fs.unlink(tempPath, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo temporal:', err);
        }
        reject(new Error('Extensión de archivo no válida. Se permiten archivos PNG, JPG, JPEG o GIF.'));
      });
    }
  });
}


function saveImageInfo(postId, imageURL) {
  const imageInfo = {
    id: generateHash(), 
    idPost: postId,
    imageURL: imageURL
  };

  fs.readFile('postImagesInfo.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo postImagesInfo.json:', err);
      return;
    }

    let imagesInfo = [];
    if (data) {
      imagesInfo = JSON.parse(data);
    }

    imagesInfo.push(imageInfo);

    fs.writeFile('postImagesInfo.json', JSON.stringify(imagesInfo), 'utf8', (err) => {
      if (err) {
        console.error('Error al guardar la información de la imagen:', err);
      } else {
        console.log('Información de la imagen guardada correctamente.');
      }
    });
  });
}


const imageFile = {
  path: 'path/to/temp/image.png',
  originalname: 'image.png'
};
const postId = 'abc123';

saveImage(imageFile, postId)
  .then((imagePath) => {
    console.log('Imagen guardada:', imagePath);
    saveImageInfo(postId, imagePath);
  })
  .catch((error) => {
    console.error('Error al guardar la imagen:', error.message);
  });

module.exports = {
  saveImage,
  saveImageInfo
};


