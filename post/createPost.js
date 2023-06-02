'use strict';

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

async function createPost(title, description, idUser, category) {
  try {
    const url = 'http://localhost:3000/posts';

    const postData = {
      title: title,
      description: description,
      idUser: idUser,
      category: category,
      createAt: new Date(),
      modifiedAt: new Date()
    };

    const newPost = await httpPost(url, postData);

    console.log('Nuevo post creado con ID:', newPost.id);
  } catch (error) {
    console.error('Error al crear el post:', error.message);
  }
}

module.exports = createPost;


