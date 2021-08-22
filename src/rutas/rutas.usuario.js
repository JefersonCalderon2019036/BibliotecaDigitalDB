"use strict"

//Exportaciones
const express = require("express");
const controladrousuario = require("../controladores/usuario.controlador");

//Middlewars
var md_autentication = require("../middlewares/authenticated")

//Rutas localhost:3000/api/<funcion>
var api = express.Router();

api.put("/login", controladrousuario.login)
api.post("/CrearUnUsuarioEstudiante", controladrousuario.CrearUnUsuarioEstudiante);
api.post("/CrearUnUsuarioComoAdmin/:idU", md_autentication.ensureAuth, controladrousuario.CrearUnUsuarioComoAdmin);
api.get("/ListarTodosLosUsuariosAscendente/:idU", md_autentication.ensureAuth, controladrousuario.ListarTodosLosUsuariosAscendente);
api.get("/ListarTodosLosUsuariosDescendente/:idU", md_autentication.ensureAuth, controladrousuario.ListarTodosLosUsuariosDescendente);
api.get("/BuscarUnUsuarioId/:idU", md_autentication.ensureAuth, controladrousuario.BuscarUnUsuarioId);
api.put("/EditarUsuarioComoAdmin/:idU/:IdUserEditar", md_autentication.ensureAuth, controladrousuario.EditarUsuarioComoAdmin)
api.put("/EditarMiUsuario/:idU", md_autentication.ensureAuth, controladrousuario.EditarMiPropioUsuario)
api.delete("/EliminarUsuariosComoAdmin/:idU/:EIdU", md_autentication.ensureAuth, controladrousuario.EliminarUsuariosComoAdmin)
api.delete("/EliminarMiUsuario/:EIdU", md_autentication.ensureAuth, controladrousuario.EliminarMiUsuario)

module.exports = api;