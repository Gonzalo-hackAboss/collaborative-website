const faker = require("faker-js");
const { uuidv4 } = require("uuid");
const { generateUUID } = require("../services/cryptoServices");
const { getConnection } = require("../database/mysqlConnection");

getConnection();

const categorias = [
    "Salud",
    "Politica",
    "Deportes",
    "Viajes",
    "Cocina",
    "Internacional",
    "Nacional",
    "Música",
];

// Generar un post aleatorio
function generatePost() {
    const id = generateUUID();
    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const createdAt = faker.date.past();
    const modifiedAt = faker.date.between(createdAt, new Date());
    const idUser = generateUUID();
    const category = faker.random.arrayElement(categorias);

    return {
        id,
        title,
        description,
        idUser,
        createdAt,
        modifiedAt,
    };
}

// Generar una categoría aleatoria
function generateCategory() {
    const id = generateUUID();
    const category = faker.lorem.word();
    const description = faker.lorem.sentence();

    return {
        id,
        category,
        description,
    };
}

// Generar una relación entre categoría y post aleatoria
function generateCategoryPostRelation(categoryId, postId) {
    const id = generateUUID();

    return {
        id,
        idPost: postId,
        idCategory: categoryId,
    };
}

// Ejemplo de uso
const numPosts = 10; // Número de posts que quieres generar

const posts = [];
const categories = [];
const categoryPostRelations = [];

// Generar posts
for (let i = 0; i < numPosts; i++) {
    const post = generatePost();
    posts.push(post);

    const numCategories = faker.random.number({ min: 1, max: 3 }); // Número aleatorio de categorías para cada post

    // Generar categorías y relaciones entre categorías y posts
    for (let j = 0; j < numCategories; j++) {
        const category = generateCategory();
        const relation = generateCategoryPostRelation(category.id, post.id);

        categories.push(category);
        categoryPostRelations.push(relation);
    }
}

console.log(posts);
console.log(categories);
console.log(categoryPostRelations);
