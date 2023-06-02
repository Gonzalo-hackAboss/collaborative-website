'use strict';

const fs = require('fs');

function createCommentsFile() {
  return new Promise((resolve, reject) => {
    const initialData = '[]';

    fs.writeFile('comments.json', initialData, 'utf8', (err) => {
      if (err) {
        reject(new Error('Error al crear el archivo "comments.json".'));
      } else {
        resolve('Archivo "comments.json" creado correctamente.');
      }
    });
  });
}

function editComment(commentId, newComment) {
  return new Promise((resolve, reject) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Error al leer los comentarios.'));
        return;
      }

      let comments = [];
      if (data) {
        comments = JSON.parse(data);
      }

      
      const comment = comments.find(c => c.commentId === commentId);

      if (comment) {
        
        comment.comment = newComment;

        
        fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
          if (err) {
            reject(new Error('Error al guardar el comentario actualizado.'));
          } else {
            resolve('Comentario editado correctamente.');
          }
        });
      } else {
        reject(new Error('No se encontró el comentario especificado.'));
      }
    });
  });
}


const commentId = 'abc123';
const newComment = 'Este es el nuevo comentario';

createCommentsFile()
  .then((message) => {
    console.log(message);
    
    return editComment(commentId, newComment);
  })
  .then((editMessage) => {
    console.log(editMessage);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

module.exports = {
  createCommentsFile,
  editComment
};
