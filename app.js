"use strict"

//Variables Globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

//Rutas
var UsuariosRutas = require("./src/rutas/rutas.usuario")
var LibrosRutas = require("./src/rutas/rutas.libros")
var RevistasRutas = require("./src/rutas/rutas.revistas")

//Middlewars
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/api', UsuariosRutas);
app.use("/api", LibrosRutas)
app.use("/api", RevistasRutas)

//Exportar
module.exports = app;