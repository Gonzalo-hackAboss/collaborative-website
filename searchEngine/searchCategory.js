const { getConnection } = require("../database/mysql-connection");
const { searchError } = require("../services/error-service");

const db = getConnection();

/*
module.exports = async ({ search }) => {
    const posts = dbService.searchByCategory(search);
    return posts;
};
*/

module.exports = {
    async searchByCategory(searchTerm, categoryNameArray) {
        try {
            const likeTerm = `%${searchTerm}%`;
            let statement = `
            SELECT * FROM Tems
            WHERE ?
            `;
            for (let i = 0; i < categoryNameArray.length; i++) {
                statement += "OR c.name = ?";
            }

            await db.execute(statement, categoryNameArray);
            const [rows, fields] = await db.execute(
                statement,
                categoryNameArray
            );
            return rows;
        } catch (err) {
            searchError(err);
        }
    },
};

/* 
module.exports =
async (seachByCategory(searchTerm) {
    const likeTerm = `%${searchTerm}%`
    const statement = `
    SELECT * FROM category
    WHERE category LIKE ?
    OR
    description LIKE ? 
    `
    const row = await db.execute(statement, [likeTerm, likeTerm])
    return row;
};
});
OTRO EJEMPLO
SQL
post -> category_post <- category
SELECT * FROM posts P
INNER JOIN category_post CP
ON P.id = cp.postId
INNER JOIN category Cçon C.id = CP.categoryId
WHERE c.name = "deportes"
OR
c.name = "politica"
Para evitar duplicidad (categoria: politica y deporte a la vez)
Puedes usar un 
SELECT DISTINCT C.name 
así no tendré la misma columna 2 veces
jugar con esto
CON ARRAY
en el dbService.js
async seachByCategory(searchTerm, categoryNameArray) {
    const likeTerm = `%${searchTerm}%`
    const statement = `
    SELECT * FROM category
    WHERE 
    `;
    for (let i = 0; i < categoryNameArray.length; i++) {
        statement += "OR c.name = ?;
    }
    await db.execute(statement, categoryNameArray])
};
*/
