//se importa una referencia a la conexión.
var con = require('../lib/conexionbd');

function modificarCompetencia(req, res) {
    var modificar =  req.params.id;
    var idCompetencia = "SELECT * FROM competencia WHERE id= "+modificar;
    con.query(idCompetencia, function (error, competencia, fields) {
    if (error) {
        console.log("Hubo un error al traer la competencia", error.message);
        return res.status(404).send(error);
    }
    if (competencia.length !== 1) {
        return res.status(404).send("No existe la competencia");
    }

    var peliValida = competencia[0].id;
    var generoPeli = competencia[0].genero_id;
    var directorPeli = competencia[0].director_id;
    var actorPeli = competencia[0].actor_id;
    
    if (!peliValida ) {
        var sql = "";
    }
    if (peliValida) {
        var sql = "SELECT * FROM competencia WHERE id = " + modificar;
    }
    if (peliValida && generoPeli != null && directorPeli === null) {
        var sql = "SELECT competencia.id, competencia.nombre, genero.nombre AS generos FROM competencia JOIN genero ON competencia.genero_id = genero.id WHERE competencia.id = " + modificar;
    }
    if (peliValida && generoPeli === null && directorPeli != null ) {
        var sql = "SELECT competencia.id, competencia.nombre, director.nombre AS directores FROM competencia JOIN director ON competencia.director_id = director.id WHERE competencia.id =  " + modificar;
    }
    if (peliValida && generoPeli != null && directorPeli != null ) {
        var sql = "SELECT competencia.id, competencia.nombre, genero.nombre AS generos, director.nombre AS directores FROM competencia JOIN genero ON competencia.genero_id = genero.id JOIN director ON competencia.director_id = director.id WHERE competencia.id = " + modificar;
    }

     if (peliValida && actorPeli != null && generoPeli === null && directorPeli === null ) {
        var sql = "SELECT competencia.id, competencia.nombre, actor.nombre AS actor FROM competencia JOIN actor ON actor_id = actor.id WHERE competencia.id = "+modificar;
    }
    if (peliValida && generoPeli != null && directorPeli === null && actorPeli != null ) {
        var sql = "SELECT competencia.id, competencia.nombre, genero.nombre AS generos, actor.nombre AS actor FROM competencia JOIN genero ON competencia.genero_id = genero.id JOIN actor ON actor_id = actor.id WHERE competencia.id = "+modificar;
    }
    if (peliValida && generoPeli != null && directorPeli != null && actorPeli != null ) {
        var sql = "SELECT competencia.id, competencia.nombre, genero.nombre AS generos, director.nombre AS directores, actor.nombre AS actor FROM competencia JOIN genero ON competencia.genero_id = genero.id JOIN director ON competencia.director_id = director.id JOIN actor ON actor_id = actor.id WHERE competencia.id = "+modificar;
    }
        console.log(sql);
        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta el Id no es valido", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            if (resultado.length == 0) {
                console.log("No se encontro ningún nombre con ese id");
                return res.status(404).send("No se encontro ningún nombre con ese id");
            } else {
                var response = {
                    'id': resultado,
                    'nombre': resultado[0].nombre,
                    'genero_nombre': resultado[0].generos,
                    'director_nombre': resultado[0].directores,
                    'actor_nombre': resultado[0].actor,
                };
                res.send(JSON.stringify(response));
                console.log(response)
            }
        });
    });
}
// ================================================================================================================================= //
// ================================================================================================================================= //
function vaciarCompetencia(req, res) {
    var compe = req.params.idCompetencia;
    console.log(req.params);
    var sql = "DELETE FROM voto WHERE competencia_id = " +compe;
    console.log(sql);

        con.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            if (resultado.length == 0) {
                console.log("No se encontro ninguna Competencia con ese id");
                return res.status(404).send("No se encontro ninguna Competencia con ese id");
            }
            else {
                var response = {
                    'votos': resultado,
                };
                res.send(JSON.stringify(response));
            }
            console.log(response);
        });
}

// ================================================================================================================================= //
// ================================================================================================================================= //
function generosCompetencia(req, res) {
    var sql = "select * from genero"
    con.query(sql, function(error, generos, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(generos));
    });
}

// ================================================================================================================================= //
// ================================================================================================================================= //
function directoresCompetencia(req, res) {
    var sql = "select * from director"
    con.query(sql, function(error, director, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(director));
    });
}

// ================================================================================================================================= //
// ================================================================================================================================= //
function actoresCompetencia(req, res) {
    var sql = "select * from actor"
    con.query(sql, function(error, actor, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        res.send(JSON.stringify(actor));
    });
}

// ================================================================================================================================= //
// ================================================================================================================================= //
function crearCompetencias(req, res) {
    var nombreCompetencia = req.body.nombre;
    var generoCompetencia = req.body.genero === '0' ? null : req.body.genero;
    var directorCompetencia = req.body.director === '0' ? null : req.body.director;
    var actorCompetencia = req.body.actor === '0' ? null : req.body.actor;

    var sql = "INSERT INTO competencia (nombre, genero_id, director_id, actor_id) VALUES ('" + nombreCompetencia + "', " + generoCompetencia + ", " + directorCompetencia + ", " + actorCompetencia + ");";
    console.log(2)
    console.log(sql);

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            return res.status(500).json(error);
        }
        var response = {
            'competencia': resultado
        };
        res.send(JSON.stringify(response));
    });
}
// ================================================================================================================================= //
// ================================================================================================================================= //
function eliminarCompetencia(req, res) {
    var compe = req.params.id;
    // console.log(req.params);
    var sql = "UPDATE competencia SET inactivo = 1 WHERE id = " +compe;
    console.log(sql);
    con.query(sql, function(error, resultado, fields) {
        if (error) {
        console.log("Hubo un error en la consulta", error.message);
        return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
        console.log("No se encontro ninguna Competencia con ese id");
        return res.status(404).send("No se encontro ninguna Competencia con ese id");
        } else {
        var response = {
        'id': resultado,
        };
        res.send(JSON.stringify(response));
        }
        console.log(response);
    });
}
// ================================================================================================================================= //
// ================================================================================================================================= //
//Solo permite actualizar el nobmre de la competencia
function actualizarCompetencia(req, res) {
    var competenciaId = req.params.id;
    var nombreNuevo = req.body.nombre;
    var sql= "UPDATE competencia SET nombre = '" + nombreNuevo + "' WHERE id = " + competenciaId;
    con.query(sql, function(error, resultado, fields) {
        
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
            if (resultado.length == 0){
                console.log("No se encontro la pelicula buscada con ese id");
                return res.status(404).send("No se encontro ninguna pelicula con ese id");
            } else {
            var response = {
                'id': resultado
            };       
            res.send(JSON.stringify(response));
            }
    });
    }
// ================================================================================================================================= //
// ================================================================================================================================= //
//se exportan las funciones creadas
module.exports = {
    crearCompetencias: crearCompetencias,
    modificarCompetencia: modificarCompetencia,
    vaciarCompetencia: vaciarCompetencia,
    generosCompetencia: generosCompetencia,
    directoresCompetencia: directoresCompetencia,
    actoresCompetencia: actoresCompetencia,
    //Guia 3  -CRUD
    eliminarCompetencia: eliminarCompetencia,
    actualizarCompetencia: actualizarCompetencia,
   
};