"use strict"

//Exportaciones
const express = require("express");
const controladrorevistas = require("../controladores/revistas.controlador");

//Middlewars
var md_autentication = require("../middlewares/authenticated")

//Rutas localhost:3000/api/<funcion>
var api = express.Router();
api.post("/AgregarUnRevista/:idU", md_autentication.ensureAuth, controladrorevistas.AgregarUnRevista)
api.get("/buscarporpalabrasclavesRevistas", md_autentication.ensureAuth, controladrorevistas.buscarporpalabrasclaves)
api.get("/ObtenerTodasLasRevistas", md_autentication.ensureAuth, controladrorevistas.ObtenerTodasLasRevistas)

module.exports = api;