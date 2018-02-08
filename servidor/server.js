//paquetes necesarios para el proyecto
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//Lamando a los controladores
var controladorAdmin = require('./controladores/controladorAdmin');
var controladorCliente = require('./controladores/controladorCliente');
var controladorPeliculas = require('./controladores/controladorPeliculas');

//Instanciamos al objeto express para trabajar con sus metodos.
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//cuando se llama a la ruta /competencias, se ejecuta la acción listarCompetencias.
app.get('/competencias', controladorCliente.listarCompetencias);
//cuando se llama a la ruta post  /competencias, se ejecuta la acción crearCompetencias.
app.post('/competencias', controladorAdmin.crearCompetencias);
//cuando se llama a la ruta generos /generos, se ejecuta la acción
app.get('/generos', controladorAdmin.generosCompetencia);
//cuando se llama a la ruta directores /directores, se ejecuta la acción
app.get('/directores', controladorAdmin.directoresCompetencia);
//cuando se llama a la ruta directores /directores, se ejecuta la acción
app.get('/actores', controladorAdmin.actoresCompetencia);

//Muestro las opciones Disponibles por cada pregunta
app.get('/competencias/:id/peliculas', controladorPeliculas.opcionesCompetencia);
// app.get('/competencias/:id/peliculas', controladorCompetencias.opcionesCompetencia);

//Cargo los votos
app.post('/competencias/:idCompetencia/voto', controladorCliente.votosCompetencia);
app.get('/competencias/:id/resultados', controladorCliente.resultadosCompetencia);
// app.put('/competencias/:idCompetencia/voto', controladorCompetencias.votosCompetencia);

app.get('/competencias/:id', controladorAdmin.modificarCompetencia);

//cuando se llama a la ruta delete  /competencias, se ejecuta la acción vaciarCompetenciar
// app.get('/competencias/:id/votos', controladorCompetencias.vaciarCompetencia);
app.delete('/competencias/:idCompetencia/votos', controladorAdmin.vaciarCompetencia);
// MODIFICACIONES A LAS COMPETENCIAS
app.delete('/competencias/:id', controladorAdmin.eliminarCompetencia);
app.put('/competencias/:id', controladorAdmin.actualizarCompetencia);


/*----------------------------------------------------------------------*/
//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';
app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
// app.listen(process.env.EXPRESS_PORT, function () {
//   console.log(`http://localhost:${process.env.EXPRESS_PORT}/`);
// });

