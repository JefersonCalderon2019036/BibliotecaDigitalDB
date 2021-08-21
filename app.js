"use strict"

//Variables Globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

//Rutas
var UsuariosRutas = require("./src/rutas/rutas.usuario")

//Middlewars
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/api', UsuariosRutas);
//Exportar
module.exports = app;