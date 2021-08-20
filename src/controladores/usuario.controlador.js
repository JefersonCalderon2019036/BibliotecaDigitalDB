'use strict'

var Usuario = require("../modelos/modelo.usuario")
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../servicios/jwt');

function CrearUnAdministrador(req, res){
    var UsuarioModelo = new Usuario();

    Usuario.findOne({carnet: 0}, (err, UsuarioEncontrado) => {
        if(err) console.log("Error en la petición de busqueda de usuario")

        if(UsuarioEncontrado){
            console.log('Usuario administrador ya creado')
            console.log(UsuarioEncontrado)
        }else{
            bcrypt.hash("adminpractica”", null, null, (err, passwordHash) => {

                if(err) console.log("Error en la petición de encriptación")

                if(passwordHash){
                    UsuarioModelo.carnet = 0;
                    UsuarioModelo.imagen = "http://www.w3bai.com/w3css/img_avatar3.png";
                    UsuarioModelo.cantidaddelibros = 0;
                    UsuarioModelo.nombre = "adminpractica";
                    UsuarioModelo.correoelectronico = "adminpractica";
                    UsuarioModelo.contrasena = passwordHash;
                    UsuarioModelo.rol = "admin";

                    UsuarioModelo.save((err, userSaved) => {
                        if(err) console.log("Error en la petición de guardado")
                        if(!userSaved) console.log("No se a podido guardar el usuario admin")
                        console.log(userSaved)
                    })
                }else{
                    console.log("No se pudo encriptar la contraseña")
                }
            })
        }
    })
}

module.exports = {
    CrearUnAdministrador
}