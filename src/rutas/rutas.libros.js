"use strict"

//Exportaciones
const express = require("express");
const controladordelibros = require("../controladores/libros.controlador");

//Middlewars
var md_autentication = require("../middlewares/authenticated")

//Rutas localhost:3000/api/<funcion>
var api = express.Router();

/**Funcioens para los documentos */
api.post("/AgregarUnNuevoLibro/:idU",md_autentication.ensureAuth, controladordelibros.AgregarUnNuevoLibro)
api.put("/buscarporpalabrasclavesLibros", md_autentication.ensureAuth, controladordelibros.buscarporpalabrasclaves)
api.get("/ObtenerTodosLosLibros", md_autentication.ensureAuth, controladordelibros.ObtenerTodosLosLibros)
api.get("/ObtenerTodasLasRevistas", md_autentication.ensureAuth, controladordelibros.ObtenerTodasLasRevistas)
api.get("/ObtenerUnSoloLibro/:idU", md_autentication.ensureAuth, controladordelibros.ObtenerUnSoloLibro)
api.get("/ObtenerDocumentosMasVistos", md_autentication.ensureAuth, controladordelibros.ObtenerDocumentosMasVistos)
api.get("/ObtenerTodoLosDocumentos", md_autentication.ensureAuth, controladordelibros.ObtenerTodoLosDocumentos)
api.put("/EditarLibros/:idU/:IdE", md_autentication.ensureAuth, controladordelibros.EditarLibros)
api.delete("/ELiminarUnLibro/:idU/:IdE", md_autentication.ensureAuth, controladordelibros.ELiminarUnLibro)

/**Funciones para prestamos */
api.put("/PrestarLibros", md_autentication.ensureAuth, controladordelibros.PrestarLibros)
api.put("/devolverlibro", md_autentication.ensureAuth, controladordelibros.devolverlibro)
api.get("/ObtenerUnSoloPrestamo/:idl", md_autentication.ensureAuth, controladordelibros.ObtenerUnSoloPrestamo)
api.get("/ObtenerPrestamosPorUsuario/:idU", md_autentication.ensureAuth, controladordelibros.ObtenerPrestamosPorUsuario)
api.get("/ObtenerPrestamoPorUsuarioyLibro/:idU/:idl", md_autentication.ensureAuth, controladordelibros.ObtenerPrestamoPorUsuarioyLibro)
api.get("/ObtenerTodosLosPrestamos", md_autentication.ensureAuth, controladordelibros.ObtenerTodosLosPrestamos)
api.get("/ObtenerPrestamosActivosDescendentes/:idU", md_autentication.ensureAuth, controladordelibros.ObtenerPrestamosActivosDescendentes)
api.get("/ObtenerPrestamosInactivosDescendentes/:idU", md_autentication.ensureAuth, controladordelibros.ObtenerPrestamosInactivosDescendentes)
api.get("/ObtenerPDPorUsuairo/:idU", md_autentication.ensureAuth, controladordelibros.ObtenerPDPorUsuairo)
api.get("/HistorialDeUsuarios/:idU", md_autentication.ensureAuth, controladordelibros.HistorialDeUsuarios)


module.exports = api;