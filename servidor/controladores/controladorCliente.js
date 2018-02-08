//se importa una referencia a la conexión.
var con = require('../lib/conexionbd');

function listarCompetencias(req, res) {
    var sql = "SELECT * FROM competencia WHERE inactivo = 0"
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(resultado));
    });
}
// ================================================================================================================================= //
// ================================================================================================================================= //
function resultadosCompetencia(req, res) {
    var compe = req.params.id
    var sql = "SELECT pelicula_id, COUNT(*) AS votos, pelicula.titulo, pelicula.poster FROM voto JOIN competencia ON voto.competencia_id = competencia.id JOIN pelicula ON voto.pelicula_id = pelicula.id WHERE voto.competencia_id = " + compe + " GROUP BY competencia_id, pelicula_id HAVING COUNT(*) >= 1 ORDER BY votos DESC LIMIT 3";
     console.log(sql);
        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
                console.log(resultado);
            }
            if (resultado.length == 0) {
                console.log("No Existen Resultados para mostrar");
                return res.status(404).send("La competencia esta sin votos");
            } else {
                var response = {
                    'resultados': resultado,
                };
                res.send(JSON.stringify(response));
            }
            console.log(response);
        });
}

// ================================================================================================================================= //
// ================================================================================================================================= //
function votosCompetencia(req, res) {
    var voto = req.body;
    var pelicula = voto.idPelicula
    var compe = req.params.idCompetencia;
    console.log(req.params);
    var sql = "INSERT INTO voto (competencia_id, pelicula_id) VALUES (" + compe + ","+ pelicula + ")";
    // console.log(sql);
        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            if (resultado.length == 0) {
                console.log("No se encontro ningún nombre con ese id");
                return res.status(404).send("No se encontro ningún nombre con ese id");
            } else {
                var response = {
                    'voto': resultado.insertId,
                };
                res.send(JSON.stringify(response));
            }
            console.log(response);
        });
}

//se exportan las funciones creadas
module.exports = {
    listarCompetencias: listarCompetencias,
    votosCompetencia: votosCompetencia,
    resultadosCompetencia: resultadosCompetencia,
};