"use strict"

//Exportaciones
const express = require("express");
const controladordelibros = require("../controladores/libros.controlador");

//Middlewars
var md_autentication = require("../middlewares/authenticated")

//Rutas localhost:3000/api/<funcion>
var api = express.Router();
api.post("/AgregarUnNuevoLibro/:idU",md_autentication.ensureAuth, controladordelibros.AgregarUnNuevoLibro)
api.get("/buscarporpalabrasclaves", md_autentication.ensureAuth, controladordelibros.buscarporpalabrasclaves)
api.get("/ObtenerTodosLosLibros", md_autentication.ensureAuth, controladordelibros.ObtenerTodosLosLibros)

module.exports = api;