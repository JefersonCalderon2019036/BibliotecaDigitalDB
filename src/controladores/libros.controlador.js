'use strict'

var Usuario = require("../modelos/modelo.usuario")
var Libros = require("../modelos/modelo.libros")

function AgregarUnNuevoLibro(req, res){
   var params = req.body;
   var userId = req.params.idU;
   var ModeloLibros = new Libros();

   /* se verifica que se allan llenado los datos necesarios */
   if(params.palabrasclaves && params.autor && params.nombre && params.edicion && params.temas){

    /* se busca el usuario para ver si es administrador */
    Usuario.findOne({ _id: userId, rol: "admin"}, (err, usuariosEncontrado) => {
                if(err) return res.status(404).send({mensaje: "Error en la petición de busqueda"})
                if(usuariosEncontrado){
                    /*funcion para buscar el libro para ve si existe */
                    Libros.findOne({autor: params.autor, nombre: params.nombre, edicion: params.edicion}, (err, libroencontrado) =>{
                        if(err) return res.status(500).send({mensaje: "Error en la petición de busqueda"})
                        if(libroencontrado){
                            return res.status(200).send({mensaje: "El libro ya existe"})
                        }else{
                            var texto = params.palabrasclaves
                            var temas = params.temas
                            var posicion1 = texto.indexOf(",")
                            var arraydatos = []
                            var arraytemas = []

                            console.log(posicion1)

                            if(posicion1 == -1){
                                arraydatos.push(texto)
                            }else{

                            do{
                                var posicion2 = texto.indexOf(",")
                                var imprimirtexto = texto.substr(0, posicion2)
                                arraydatos.push(imprimirtexto)
                                posicion2 = posicion2+2
                                texto = texto.substring(posicion2)
                                var posicion1 = texto.indexOf(",")
                            }while(posicion1 != -1 )
                            arraydatos.push(texto)
                            
                            }
                            var posicion1 = temas.indexOf(",")

                            if(posicion1 == -1){
                                arraytemas.push(temas)
                            }else{
                                do{
                                    var posicion2 = temas.indexOf(",")
                                    var imprimirtexto = temas.substr(0, posicion2)
                                    arraytemas.push(imprimirtexto)
                                    posicion2 = posicion2+2
                                    temas = temas.substring(posicion2)
                                    var posicion1 = temas.indexOf(",")
                                }while(posicion1 != -1)
                                arraytemas.push(temas)
                            }


                            ModeloLibros.autor = params.autor;
                            ModeloLibros.nombre = params.nombre;
                            ModeloLibros.edicion = params.edicion;
                            ModeloLibros.descripcion = params.descripcion;
                            ModeloLibros.copias = params.copias;
                            ModeloLibros.Dispobles = params.copias;
                            ModeloLibros.palabrasclaves = arraydatos;
                            ModeloLibros.Temas = arraytemas;

                            ModeloLibros.save((err, userSaved) => {
                                if(err) res.status(500).send({mensaje:"Error en la petición de guardado"})
                                if(!userSaved) res.status(404).send({mensaje: "No se a podido guardar su libro"})
                                return res.status(200).send(userSaved)
                            })
                        }       
                    })
                }else{
                    return res.status(404).send({mensaje: "No tiene permisos para agregar un nuevo libro"})
                }
            })  
   }else{
       return res.status(404).send({mensaje: "Rellene los datos necesarios"})
   }
}

function buscarporpalabrasclaves(req, res){
    var params = req.body.busqueda
    
    Libros.find({palabrasclaves: params},(err, BusquedaPorPalabrasClaves) => {
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!BusquedaPorPalabrasClaves) return res.status(500).send({mensaje: 'Error al obtener los libros'})
        if(BusquedaPorPalabrasClaves <= 0){
            Libros.find({Temas: params},(err, BusquedaPorTemas) => {
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
                if(!BusquedaPorTemas) return res.status(500).send({mensaje: 'Error al obtener los libros'})
                if(BusquedaPorTemas <= 0){
                    return res.status(200).send({mensaje: 'No hay libros con estos datos de busqueda'})
                }else{
                    return res.status(200).send(BusquedaPorTemas)
                }
            })
        }else{
            return res.status(200).send(BusquedaPorPalabrasClaves)
        }
    })
}

function ObtenerTodosLosLibros(req, res){

    Libros.find((err, UsuariosEncontrados) => {
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!UsuariosEncontrados) return res.status(500).send({mensaje: 'Error al obtener los libros'})
        if(UsuariosEncontrados <= 0){
            return res.status(404).send({mensaje: 'No hay ningun libro'})
        }else{
            return res.status(200).send(UsuariosEncontrados)
        }
    })
}

function ObtenerUnSoloLibro(req, res){
    var userId = req.params.idU

    Libros.findOne({ _id: userId}, (err, usuariosEncontrado) =>{
        if (err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!usuariosEncontrado) return res.status(404).send({mensaje: "No hay libro con este código de registro"});
        res.status(200).send(usuariosEncontrado)
    })  
}

function EditarLibros(req, res){

    var params = req.body;
    var userId = req.params.idU
    var userIdEditar = req.params.IdE

    if(params.palabrasclaves){
        var texto = params.palabrasclaves
        var posicion1 = texto.indexOf(",")
        var arraydatos = []

        if(posicion1 == -1){
            arraydatos.push(texto)
        }else{

        do{
            var posicion2 = texto.indexOf(",")
            var imprimirtexto = texto.substr(0, posicion2)
            arraydatos.push(imprimirtexto)
            posicion2 = posicion2+2
            texto = texto.substring(posicion2)
            var posicion1 = texto.indexOf(",")
        }while(posicion1 != -1 )
        arraydatos.push(texto)
        params.palabrasclaves = arraydatos
        }
    }

    if(params.Temas){
        var temas = params.Temas
        var arraytemas = []
        var posicion1 = temas.indexOf(",")

        if(posicion1 == -1){
            arraytemas.push(temas)
        }else{
            do{
                var posicion2 = temas.indexOf(",")
                var imprimirtexto = temas.substr(0, posicion2)
                arraytemas.push(imprimirtexto)
                posicion2 = posicion2+2
                temas = temas.substring(posicion2)
                var posicion1 = temas.indexOf(",")
            }while(posicion1 != -1)
            arraytemas.push(temas)
            params.Temas = arraytemas
        }
    }

    Usuario.findOne({ _id: userId, rol: "admin"}, (err, usuariosEncontrado) =>{
        if (err) return res.status(404).send({mensaje: "Error en la petición de busqueda"});
        if(!usuariosEncontrado) return res.status(404).send({mensaje: "No tienes permiso para realizar esta petición"});

        Libros.findByIdAndUpdate(userIdEditar, params, {new: true}, (err, libroeditado) => {
            if(err) return res.status(500).send({mensaje: 'Error en la petición de editar'})
            if(!libroeditado) return res.status(404).send({mensaje: 'No se ha podido actualizar el libro'})
            return res.status(200).send(libroeditado)
        })
    })
}

module.exports = {
    AgregarUnNuevoLibro,
    buscarporpalabrasclaves,
    ObtenerTodosLosLibros,
    ObtenerUnSoloLibro,
    EditarLibros
}