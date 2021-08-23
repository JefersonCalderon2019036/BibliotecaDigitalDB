'use strict'

var Usuario = require("../modelos/modelo.usuario")
var Revistas = require("../modelos/modelo.revistas")

function AgregarUnRevista(req, res){
    var params = req.body;
    var userId = req.params.idU;
    var ModeloRevistas = new Revistas();

    //Se realizar una verificacion para ver si se relleno los datos necesarios para agregar un nuevo libro
    if(params.autor 
        && params.titulo 
        && params.edicion 
        && params.frecuenciaactual 
        && params.ejemplares
        && params.copias
        && params.palabrasclaves
        && params.Temas){
            // funcion para buscar el administrador
            Usuario.findOne({ _id: userId, rol: "admin"}, (err, usuariosEncontrado) => {
                if(err) return res.status(500).send({mensaje: "Error en la petición de busqueda"})
                if(!usuariosEncontrado) return res.status(404).send({mensaje: "No tiene permisos para agregar una nueva revista"})
                
                //funcion para buscar una revista con estos datos
                Revistas.findOne({autor: params.autor,titulo: params.titulo,edicion: params.edicion }, (err, revistaencontrada) => {
                    if(err) return res.status(500).send({mensaje: "Error en la petición de busqueda"})
                    if(!revistaencontrada){

                        
                            var texto = params.palabrasclaves
                            var temas = params.Temas
                            var arraydatos = []
                            var arraytemas = []

                            // Se realiza la separación de datos de las palabras claves
                            var posicion1 = texto.indexOf(",")
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

                        // se realiza la separación de datos de los temas
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

                        //Se aguarda la nueva revista
                        ModeloRevistas.imagen = params.imagen
                        ModeloRevistas.autor = params.autor 
                        ModeloRevistas.titulo = params.titulo 
                        ModeloRevistas.edicion = params.edicion 
                        ModeloRevistas.descripcion = params.descripcion
                        ModeloRevistas.frecuenciaactual = params.frecuenciaactual 
                        ModeloRevistas.ejemplares = params.ejemplares
                        ModeloRevistas.copias = params.copias
                        ModeloRevistas.Dispobles = params.copias
                        ModeloRevistas.RevistasPrestadas = 0
                        ModeloRevistas.Temas = arraytemas
                        ModeloRevistas.palabrasclaves = arraydatos


                        ModeloRevistas.save((err, RevistaGuardada) => {
                            if(err) return res.status(500).send({mensaje: "Error en la petición de guardado"})
                            if(!RevistaGuardada) res.status(404).send({mensaje: "No sea podido guardar su revista"})
                            return res.status(200).send(RevistaGuardada)
                        })

                    }else{
                        return res.status(200).send({mensaje: "Esta revista ya existe"})
                    }
                })

            })
        }else{
            return res.status(404).send({mensaje: "Rellene lso datos necesarios"})
        }
}

function buscarporpalabrasclaves(req, res){
    var params = req.body.busqueda
    
    Revistas.find({palabrasclaves: params},(err, BusquedaPorPalabrasClaves) => {
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!BusquedaPorPalabrasClaves) return res.status(500).send({mensaje: 'Error al obtener las Revistas'})
        if(BusquedaPorPalabrasClaves <= 0){
            Revistas.find({Temas: params},(err, BusquedaPorTemas) => {
                if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
                if(!BusquedaPorTemas) return res.status(500).send({mensaje: 'Error al obtener las Revistas'})
                if(BusquedaPorTemas <= 0){
                    return res.status(200).send({mensaje: 'No hay revista con estos datos de busqueda'})
                }else{
                    return res.status(200).send(BusquedaPorTemas)
                }
            })
        }else{
            return res.status(200).send(BusquedaPorPalabrasClaves)
        }
    })
}

function ObtenerTodasLasRevistas(req, res){

    Revistas.find((err, UsuariosEncontrados) => {
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!UsuariosEncontrados) return res.status(500).send({mensaje: 'Error al obtener las revistas'})
        if(UsuariosEncontrados <= 0){
            return res.status(404).send({mensaje: 'No hay ninguna revista'})
        }else{
            return res.status(200).send(UsuariosEncontrados)
        }
    }).sort({autor:1});
}

function ObtenerUnaSolaRevista(req, res){
    var userId = req.params.idU

    Revistas.findOne({ _id: userId}, (err, usuariosEncontrado) =>{
        if (err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!usuariosEncontrado) return res.status(404).send({mensaje: "No hay revistas con este código de registro"});
        res.status(200).send(usuariosEncontrado)
    })  
}

function EditarRevistas(req, res){

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

        Revistas.findByIdAndUpdate(userIdEditar, params, {new: true}, (err, libroeditado) => {
            if(err) return res.status(500).send({mensaje: 'Error en la petición de editar'})
            if(!libroeditado) return res.status(404).send({mensaje: 'No se ha podido actualizar la revista'})
            return res.status(200).send(libroeditado)
        })
    })
}

function EliminarRevista(req, res){
    var userId = req.params.idU
    var Eid = req.params.IdE

    Usuario.findOne({ _id: userId, rol: "admin"}, (err, usuariosEncontrado) =>{
        if (err) return res.status(404).send({mensaje: "Error en la petición de busqueda"});
        if(!usuariosEncontrado) return res.status(404).send({mensaje: "No tienes permiso para realizar esta petición"});

        Revistas.findByIdAndDelete(Eid, (err, revistaeliminada) => {
            if(err) return res.status(500).send({mensaje: 'Error en la petición de eliminar'})
            if(!revistaeliminada) return res.status(404).send({mensaje: 'No se ha podido eliminar la revista'})
            return res.status(200).send({mensaje: 'Su revista fue eliminado exitosamente'})
        })
    })
}

module.exports = {
    AgregarUnRevista,
    buscarporpalabrasclaves,
    ObtenerTodasLasRevistas,
    ObtenerUnaSolaRevista,
    EditarRevistas,
    EliminarRevista
}