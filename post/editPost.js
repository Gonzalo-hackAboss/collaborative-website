'use strict'



function httpPost(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error al realizar la petición. Estado: ${response.status}`);
    }
    return response.json();
  });
}

async function editPost(postId, title, description, idUser, category) {
  try {
    const url = `http://localhost:3000/posts/${postId}`;

    const postData = {
      title: title,
      description: description,
      idUser: idUser,
      category: category,
      modifiedAt: new Date()
    };

    const editedPost = await httpPost(url, postData);

    console.log('Post editado con ID:', editedPost.id);
  } catch (error) {
    console.error('Error al editar el post:', error.message);
  }
}

module.exports = editPost;
