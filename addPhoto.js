'use strict'

'use strict';

const sharp = require('sharp');
const fs = require('fs');

async function resizeAndSaveImage(inputPath, outputPath, width, height) {
  try {
    
    const inputImage = await sharp(inputPath);

   
    const resizedImage = await inputImage.resize(width, height).toBuffer();

    
    fs.writeFileSync(outputPath, resizedImage);

    console.log('Imagen  guardada correctamente:', outputPath);
  } catch (error) {
    console.error('Error  guardar la imagen:', error.message);
  }
}


const inputImagePath = '';
const outputImagePath = '';
const targetWidth = 800;
const targetHeight = 600;

resizeAndSaveImage(inputImagePath, outputImagePath, targetWidth, targetHeight);
