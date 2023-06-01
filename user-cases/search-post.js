module.exports = async ({ search }) => {
    const posts = dbService.searchByCategory(search);
    return posts;
};

/*

en el dbService.js
async seachByCategory(searchTerm) {
    const statement = `
    SELECT * FROM category
    WHERE category LIKE ?
    `
    await db.execute(statement, [`%${searchTerm}%`])
};

*/
