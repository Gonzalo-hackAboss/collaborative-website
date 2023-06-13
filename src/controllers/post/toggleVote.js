"use strict";
// Traer getConnection dela base de datos// PROBAR CUANDO TENGAMOS LA BBDD CON DATOS
const errorService = require("../../services/errorService");
const getConnection = require("../../database/mysqlConnection");


function toggleVote(idUser, idPost, userVote) {
    // Consulta a la base de datos para obtener el voto existente
    connection.query(
        "SELECT votes FROM Votes WHERE idUser = ? AND idPost = ?",
        [idUser, idPost],
        (error, results) => {
            if (error) {
                console.error("Error al realizar la consulta:", error);
                requestFailed();
                return;
            }

            // Comprobar si el voto existe en la base de datos
            if (results.length === 0) {
                // El voto no existe, crearlo con valor 0 (voto negativo) o 1 (voto positivo)
                connection.query(
                    "INSERT INTO Votes (idUser, idPost, votes) VALUES (?, ?, ?)",
                    [idUser, idPost, userVote],
                    (error) => {
                        if (error) {
                            console.error("Error al crear el voto:", error);
                            requestFailed();
                            return;
                        }
                        console.log("Voto creado exitosamente.");
                    }
                );
            } else {
                const existingVote = results[0].votes;
                // Comprobar si el voto recibido es igual o diferente al existente
                if (existingVote !== userVote) {
                    // Actualizar el valor del voto en la base de datos
                    connection.query(
                        "UPDATE Votes SET votes = ? WHERE idUser = ? AND idPost = ?",
                        [userVote, idUser, idPost],
                        (error) => {
                            if (error) {
                                console.error(
                                    "Error al actualizar el voto:",
                                    error
                                );
                                requestFailed();
                                return;
                            }
                            console.log("Voto actualizado exitosamente.");
                        }
                    );
                } else {
                    // Eliminar la fila completa, ya que el voto recibido es igual al existente
                    connection.query(
                        "DELETE FROM Votes WHERE idUser = ? AND idPost = ?",
                        [idUser, idPost],
                        (error) => {
                            if (error) {
                                console.error(
                                    "Error al eliminar el voto:",
                                    error
                                );
                                requestFailed();
                                return;
                            }
                            console.log("Voto eliminado exitosamente.");
                        }
                    );
                }
            }
        }
    );
}

toggleVote(idUser, idPost, userVote);
