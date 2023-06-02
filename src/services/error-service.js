module.exports = {
    notConnectedToDataBase() {
        throw {
            status: 400,
            code: "MYSQL_CONNECTION_FAILED",
            message: "Ha fallado la conexión con la base de datos.",
        };
    },
    searchError() {
        throw {
            status: 400,
            code: "SEARCH_FAILED",
            message: "El motor de búsqueda ha fallado.",
        };
    },
};
