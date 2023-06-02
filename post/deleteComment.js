'use strict';

const fs = require('fs');

function deleteComment(commentId) {
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

      
      const commentIndex = comments.findIndex(c => c.commentId === commentId);

      if (commentIndex !== -1) {
        
        comments.splice(commentIndex, 1);

       
        fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
          if (err) {
            reject(new Error('Error al eliminar el comentario.'));
          } else {
            resolve('Comentario eliminado correctamente.');
          }
        });
      } else {
        reject(new Error('No se encontró el comentario especificado.'));
      }
    });
  });
}


const commentId = 'abc123';

deleteComment(commentId)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error('Error al eliminar el comentario:', error.message);
  });

module.exports = deleteComment;
