"use strict"

//Variables Globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

//Rutas
var UsuariosRutas = require("./src/rutas/rutas.usuario")
var LibrosRutas = require("./src/rutas/rutas.libros")

//Middlewars
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/api', UsuariosRutas);
app.use("/api", LibrosRutas);

//Exportar
module.exports = app;