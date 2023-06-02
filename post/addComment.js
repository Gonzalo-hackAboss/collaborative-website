'use strict';

const fs = require('fs');
const createCommentsFile = require("./createCommentsFile.js")




function addComment(postId, comment) {
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

      const newComment = {
        postId: postId,
        comment: comment
      };

      comments.push(newComment);

      fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
        if (err) {
          reject(new Error('Error al guardar el comentario.'));
        } else {
          resolve('Comentario añadido correctamente.');
        }
      });
    });
  });
}


function getComments(postId) {
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

      const postComments = comments.filter(comment => comment.postId === postId);

      resolve(postComments);
    });
  });
}


module.exports = {
  createCommentsFile,
  addComment,
  getComments
};
