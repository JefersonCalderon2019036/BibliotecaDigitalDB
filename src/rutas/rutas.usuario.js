"use strict"

//Exportaciones
const express = require("express");
const controladrousuario = require("../controladores/usuario.controlador");

//Middlewars
var md_autentication = require("../middlewares/authenticated")

//Rutas localhost:3000/api/<funcion>
var api = express.Router();

api.post("/login", controladrousuario.login)
api.post("/CrearUnUsuarioComoAdmin/:idU", md_autentication.ensureAuth, controladrousuario.CrearUnUsuarioComoAdmin);
api.get("/ListarTodosLosUsuariosAscendente/:idU", md_autentication.ensureAuth, controladrousuario.ListarTodosLosUsuariosAscendente);
api.get("/ListarTodosLosUsuariosDescendente/:idU", md_autentication.ensureAuth, controladrousuario.ListarTodosLosUsuariosDescendente);
api.get("/BuscarUnUsuarioId/:idU", md_autentication.ensureAuth, controladrousuario.BuscarUnUsuarioId);
api.get("/ObtenerLosUsuairosConMasPrestaciones", md_autentication.ensureAuth, controladrousuario.ObtenerLosUsuairosConMasPrestaciones);
api.put("/BuscarUnUsuarioPorCarnet/:idU", md_autentication.ensureAuth, controladrousuario.BuscarUnUsuarioPorCarnet);
api.put("/EditarUsuarioComoAdmin/:idU/:idUsuario", md_autentication.ensureAuth, controladrousuario.EditarUsuarioComoAdmin)
api.delete("/EliminarUsuariosComoAdmin/:idU/:idEu", md_autentication.ensureAuth, controladrousuario.EliminarUsuariosComoAdmin)

module.exports = api;