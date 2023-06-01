'use strict'


function httpDelete(url) {
  return fetch(url, {
    method: 'REMOVE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error al realizar la petición. Estado: ${response.status}`);
    }
    return response.json();
  });
}

async function deletePost(postId) {
  try {
    const url = `http://localhost:3000/posts/${postId}`;

    const deletedPost = await httpDelete(url);

    console.log('Post eliminado :', deletedPost.id);
  } catch (error) {
    console.error('Error al eliminar el post:', error.message);
  }
}

module.exports = deletePost;
