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
api.get("/ObtenerUnaSolaRevista/:idU", md_autentication.ensureAuth, controladrorevistas.ObtenerUnaSolaRevista)
api.put("/EditarRevistas/:idU/:IdE", md_autentication.ensureAuth, controladrorevistas.EditarRevistas)
api.delete("/EliminarRevista/:idU/:IdE", md_autentication.ensureAuth, controladrorevistas.EliminarRevista)

module.exports = api;