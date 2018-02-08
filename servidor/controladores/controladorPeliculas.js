//se importa una referencia a la conexión.
var con = require('../lib/conexionbd');

// ================================================================================================================================= //
// ================================================================================================================================= //
function opcionesCompetencia (req, res) {
    var id = req.params.id;
    var idCompetencia = "SELECT * FROM competencia WHERE id= "+id;
    con.query(idCompetencia, function (error, competencia, fields) {
        if (error) {
            console.log("Hubo un error al traer la competencia", error.message);
            return res.status(404).send(error);
        }
        if (competencia.length !== 1) {
            return res.status(404).send("No existe la competencia");
            
        }
        console.log(competencia);
        var peliValida = competencia[0].id;
        var generoPeli = competencia[0].genero_id;
        var directorPeli = competencia[0].director_id;
        var actorPeli = competencia[0].actor_id;

        if (!peliValida) {
            var sql = "";
        }
        if (peliValida) {
            var sql = "SELECT id, poster, titulo FROM pelicula ORDER BY RAND() LIMIT 2";
        }
        if (peliValida && generoPeli != null && directorPeli === null) {
            var sql = "SELECT id, poster, titulo FROM pelicula WHERE genero_id = " + generoPeli + " ORDER BY RAND() LIMIT 2";
        }
        if (peliValida && generoPeli === null && directorPeli != null ) {
            var sql = "SELECT pelicula.id, pelicula.poster, pelicula.titulo FROM pelicula JOIN director ON pelicula.director = director.nombre WHERE director.id = " + directorPeli + " ORDER BY RAND() LIMIT 2";
        }   
        if (peliValida && generoPeli != null && directorPeli != null ) {
            var sql = "SELECT pelicula.id, pelicula.poster, pelicula.titulo FROM pelicula JOIN director ON pelicula.director = director.nombre WHERE genero_id = " + generoPeli + "  AND director.id = " + directorPeli + " ORDER BY RAND() LIMIT 2";
        }
    /*------------------------------ACTORES -----------------------------------------------------------------------*/
        if (peliValida && generoPeli != null && directorPeli != null && actorPeli != null ) {
            var sql = "SELECT pelicula.id, pelicula.poster, pelicula.titulo FROM pelicula JOIN director ON pelicula.director = director.nombre JOIN actor_pelicula ON actor_pelicula.pelicula_id = pelicula.id JOIN actor ON actor_pelicula.actor_id = actor.id WHERE genero_id = " + generoPeli + " AND director.id = " + directorPeli + " AND actor.id = " + actorPeli + " ORDER BY RAND() LIMIT 2";
        }
        if (peliValida && generoPeli === null && directorPeli === null && actorPeli != null ) {
            var sql = "SELECT pelicula.id, pelicula.poster, pelicula.titulo FROM pelicula JOIN actor_pelicula ON actor_pelicula.pelicula_id = pelicula.id JOIN actor ON actor_pelicula.actor_id = actor.id WHERE actor.id = " + actorPeli + " ORDER BY RAND() LIMIT 2";
        }
        if (peliValida && generoPeli != null && directorPeli === null && actorPeli != null ) {
            var sql = "SELECT pelicula.id, pelicula.poster, pelicula.titulo FROM pelicula JOIN actor_pelicula ON actor_pelicula.pelicula_id = pelicula.id JOIN actor ON actor_pelicula.actor_id = actor.id WHERE genero_id = " + generoPeli + " AND actor.id = " + actorPeli + " ORDER BY RAND() LIMIT 2";
        }

        con.query(sql, function (error, resultados, fields) {
            console.log(sql);
            if (error) {
                console.log("Hubo un error en la consulta el Id no es valido", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            if (resultados.length == 0) {
                console.log("No se encontro ningún nombre con ese id");
                return res.status(404).send("No se encontro ningún nombre con ese id");
            } 
            else {
                var response = {
                    'competencia': competencia[0].nombre,
                    'peliculas': resultados,
                };
                res.send(JSON.stringify(response));
                console.log(response)
            }
        });
    });     
}
//===========================================================================================

// dosPeliculasRandom: function(req, res){
//     var id = req.params.id;

//     var queryCompetencia = "SELECT nombre, genero_id, director_id, actor_id FROM competencia WHERE id = " + id + ";";
//     console.log(queryCompetencia)
//     conexion.query(queryCompetencia, function(error, competencia){
//         if (error) {
//             return res.status(500).json(error);
//         }
        
//         console.log(competencia);

//         var queryPeliculas = "SELECT DISTINCT pelicula.id, poster, titulo, genero_id FROM pelicula LEFT JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id LEFT JOIN director_pelicula ON pelicula.id = director_pelicula.pelicula_id WHERE 1 = 1";

//         var genero = competencia[0].genero_id;
//         var actor = competencia[0].actor_id;
//         var director = competencia[0].director_id;
//         var queryGenero = genero ? ' AND pelicula.genero_id = '  + genero : '';
//         var queryActor = actor ? ' AND actor_pelicula.actor_id = ' + actor : '';
//         var queryDirector = director ? ' AND director_pelicula.director_id = ' + director : '';
//         var randomOrder = ' ORDER BY RAND() LIMIT 2';

//         var query = queryPeliculas + queryGenero + queryActor + queryDirector + randomOrder;
        
//         console.log(query);

//         conexion.query(query, function(error, peliculas){    
//             if (error) {
//                 return res.status(500).json(error);
//             }
            
//             var response = {
//                 'peliculas': peliculas,
//                 'competencia': competencia[0].nombre
//             };

//             // res.send(JSON.stringify(response));
//             return res.json(response);
//         });
//     });            
// },





//===========================================================================================
//se exportan las funciones creadas
module.exports = {
    opcionesCompetencia: opcionesCompetencia,
};


