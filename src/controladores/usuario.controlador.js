'use strict'

var Usuario = require("../modelos/modelo.usuario")
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../servicios/jwt');

function CrearUnAdministrador(req, res){
    var UsuarioModelo = new Usuario();

    Usuario.findOne({carnet: 0,usuario : "adminpractica"}, (err, UsuarioEncontrado) => {
        if(err) console.log("Error en la petición de busqueda de usuario")

        if(UsuarioEncontrado){
            console.log('Usuario administrador ya creado')
            console.log(UsuarioEncontrado)
        }else{
            bcrypt.hash("adminpractica", null, null, (err, passwordHash) => {

                if(err) console.log("Error en la petición de encriptación")

                if(passwordHash){
                    UsuarioModelo.carnet = 0;
                    UsuarioModelo.imagen = "http://www.w3bai.com/w3css/img_avatar3.png";
                    UsuarioModelo.cantidaddelibros = 0;
                    UsuarioModelo.usuario = "adminpractica";
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

function CrearUnUsuarioEstudiante(req, res){
    var UsuarioModelo = new Usuario();
    var params = req.body;

    /* se le piden que rellene los siguientes datos para crear su perfil */
    if(params.carnet && params.usuario && params.nombre && params.apellido && params.correoelectronico && params.contrasena){

        /* se busca que si hay un usuario con ese carnet*/
        Usuario.findOne({carnet: params.carnet,usuario : params.Usuario}, (err, UsuarioEncontrado) => {
            if(err) res.status(404).send({mensaje:"Error en la petición de busqueda de usuario"})

            if(UsuarioEncontrado){
                res.status(200).send({mensaje: "Ya existe este usuario"})
            }else{
                bcrypt.hash(params.contrasena, null, null, (err, passwordHash) => {

                    if(err) return res.status(404).send({mensaje: "Error en la petición de encriptación"})
    
                    if(passwordHash){
                        UsuarioModelo.carnet = params.carnet;
                        UsuarioModelo.imagen = "http://www.w3bai.com/w3css/img_avatar3.png";
                        UsuarioModelo.cantidaddelibros = 0;
                        UsuarioModelo.usuario = params.usuario;
                        UsuarioModelo.nombre = params.nombre;
                        UsuarioModelo.apellido = params.apellido;
                        UsuarioModelo.correoelectronico = params.correoelectronico;
                        UsuarioModelo.contrasena = passwordHash;
                        UsuarioModelo.rol = "student";
    
                        UsuarioModelo.save((err, userSaved) => {
                            if(err) res.status(404).send({mensaje:"Error en la petición de guardado"})
                            if(!userSaved) res.status(200).send({mensaje: "No se a podido guardar el usuario admin"})
                            res.status(200).send(userSaved)
                        })
                    }else{
                        res.status(200).send({mensaje:"No se pudo encriptar la contraseña"})
                    }
                })
            }
        })

    }else{
        return res.status(404).send({mensaje: "Rellene los datos necesarios para crear su perfil"})
    }
}

function ListarTodosLosUsuarios(req, res){
    var userId = req.params.idU

    Usuario.findOne({ _id: userId, rol: "admin"}, (err, usuariosEncontrado) =>{
        if (err) return res.status(404).send({mensaje: "Error en la peticion"});
        if(!usuariosEncontrado) return res.status(404).send({mensaje: "No tienes permiso para realizar esta petición"});

        Usuario.find((err, UsuariosEncontrados) => {
            if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
            if(!UsuariosEncontrados) return res.status(500).send({mensaje: 'Error al obtener los usuarios'})
            if(UsuariosEncontrados <= 0){
                return res.status(200).send({mensaje: 'No hay ningun usuario'})
            }else{
                return res.status(200).send(UsuariosEncontrados)
            }
        })
    })
    
}

function BuscarUnUsuarioId(req, res){
    var userId = req.params.idU

    Usuario.findOne({ _id: userId}, (err, usuariosEncontrado) =>{
        if (err) return res.status(404).send({mensaje: "Error en la peticion"});
        if(!usuariosEncontrado) return res.status(200).send({mensaje: "No tienes permiso para realizar esta petición"});
        res.status(200).send(usuariosEncontrado)
    })    
}


function login(req, res){
    var params = req.body;

    Usuario.findOne({ correoelectronico: params.correoelectronico}, (err, usuariosEncontrado) =>{
        if (err) return res.status(404).send({mensaje: "Error en la peticion"});

        if(usuariosEncontrado){
            bcrypt.compare(params.contrasena, usuariosEncontrado.contrasena, (err, passCorrecta)=>{
                if(passCorrecta){
                    return res.status(200).send({
                        token: jwt.createToken(usuariosEncontrado),
                        usuariosEncontrado
                    });
                }else{
                    return res.status(200).send({mensaje: "El usuario no se pudo encontrar"})
                }
            })
        }else{
            return res.status(200).send({mensaje: "El usuario no ha podido ingresar"})
        }
    })
}

function EditarUsuarioComoAdmin(req, res){
    var params = req.body;
    var userId = req.params.idU
    var userIdEditar = req.params.IdUserEditar

    Usuario.findOne({ _id: userId, rol: "admin"}, (err, usuariosEncontrado) =>{
        if (err) return res.status(404).send({mensaje: "Error en la petición de busqueda"});
        if(!usuariosEncontrado) return res.status(200).send({mensaje: "No tienes permiso para realizar esta petición"});

        Usuario.findByIdAndUpdate(userIdEditar, params, {new: true}, (err, editarusuario) => {
            if(err) return res.status(404).send({mensaje: 'Error en la petición de editar'})
            if(!editarusuario) return res.status(200).send({mensaje: 'No se ha podido actualizar el usuario'})
            return res.status(200).send(editarusuario)
        })
    })
}

function EditarMiPropioUsuario(req, res){
    var params = req.body;
    var userId = req.params.idU

    Usuario.findByIdAndUpdate(userId, params, {new: true}, (err, editarusuario) => {
        if(err) return res.status(404).send({mensaje: 'Error en la petición de editar'})
        if(!editarusuario) return res.status(200).send({mensaje: 'No se ha podido actualizar el usuario'})
        return res.status(200).send(editarusuario)
    })
}

function EliminarUsuariosComoAdmin(req, res){
    var userId = req.params.idU
    var ElIdU = req.params.EIdU

    Usuario.findOne({ _id: userId, rol: "admin"}, (err, usuariosEncontrado) =>{
        if (err) return res.status(404).send({mensaje: "Error en la petición de busqueda"});
        if(!usuariosEncontrado) return res.status(200).send({mensaje: "No tienes permiso para realizar esta petición"});

        Usuario.findByIdAndDelete(ElIdU, (err, eliminarusuario) => {
            if(err) return res.status(404).send({mensaje: 'Error en la petición de eliminar'})
            if(!eliminarusuario) return res.status(200).send({mensaje: 'No se ha podido eliminar el usuario'})
            return res.status(200).send({mensaje: 'Su usuario fue eliminado'})
        })
    })
}

function EliminarMiUsuario(req, res){
    var ElIdU = req.params.EIdU

    Usuario.findByIdAndDelete(ElIdU, (err, eliminarusuario) => {
        if(err) return res.status(404).send({mensaje: 'Error en la petición de eliminar'})
        if(!eliminarusuario) return res.status(200).send({mensaje: 'No se ha podido eliminar el usuario'})
        return res.status(200).send({mensaje: 'Su usuario fue eliminado'})
    })
}

module.exports = {
    login,
    CrearUnAdministrador,
    CrearUnUsuarioEstudiante,
    ListarTodosLosUsuarios,
    BuscarUnUsuarioId,
    EditarUsuarioComoAdmin,
    EditarMiPropioUsuario,
    EliminarUsuariosComoAdmin,
    EliminarMiUsuario
}