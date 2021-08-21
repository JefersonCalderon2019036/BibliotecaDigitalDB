"use strict"

//Exportaciones
const express = require("express");
const controladrousuario = require("../controladores/usuario.controlador");

//Middlewars
var md_autentication = require("../middlewares/authenticated")

//Rutas localhost:3000/api/<funcion>
var api = express.Router();


//Rutas de inicio principal
api.put("/login", controladrousuario.login)
api.post("/CrearUnUsuarioEstudiante", controladrousuario.CrearUnUsuarioEstudiante);

//Rutas de admin
api.get("/ListarTodosLosUsuarios/:idU", md_autentication.ensureAuth, controladrousuario.ListarTodosLosUsuarios);
api.get("/BuscarUnUsuarioId/:idU", md_autentication.ensureAuth, controladrousuario.BuscarUnUsuarioId);
api.put("/EditarUsuarioComoAdmin/:idU/:IdUserEditar", md_autentication.ensureAuth, controladrousuario.EditarUsuarioComoAdmin)
api.put("/EditarMiUsuario/:idU", md_autentication.ensureAuth, controladrousuario.EditarMiPropioUsuario)

//Rutas de student



module.exports = api;