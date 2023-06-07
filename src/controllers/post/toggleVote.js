"use strict";
// Traer getConnection dela base de datos
// PROBAR CUANDO TENGAMOS LA BBDD CON DATOS

const errorService = require("../../services/errorService");
const getConnection = require("../../database/mysqlConnection");

// Verificar si el voto ya existe en la base de datos
connection.query(
    "SELECT * FROM Votes WHERE idUser = ? AND idPost = ?",
    [userId, postId],
    (err, results) => {
        if (err) {
            console.error("Error al verificar el voto:", err);
            return res.status(500).json(errorService.requestFailed());
        }

        // Definir la consulta SQL y los valores para la actualización o inserción
        let sqlQuery;
        let sqlValues;
        if (results.length > 0) {
            // El voto ya existe, realizar una actualización
            sqlQuery =
                "UPDATE Votes SET vote = ? WHERE idUser = ? AND idPost = ?";
            sqlValues = [vote, userId, id];
        } else {
            // El voto no existe, realizar una inserción
            sqlQuery =
                "INSERT INTO Votes (idUser, idPost, vote) VALUES (?, ?, ?)";
            sqlValues = [userId, id, vote];
        }

        // Ejecutar la consulta correspondiente
        connection.query(sqlQuery, sqlValues, (err) => {
            if (err) {
                console.error("Error al realizar la consulta:", err);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal server error" });
            }

            const message =
                results.length > 0
                    ? "Voto actualizado correctamente"
                    : "Voto registrado correctamente";
            return sendResponse(res, { success: true, message: "Votación" });
        });
    }
);
