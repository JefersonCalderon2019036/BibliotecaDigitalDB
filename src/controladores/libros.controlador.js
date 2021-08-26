'use strict'

var Usuario = require("../modelos/modelo.usuario")
var Libros = require("../modelos/modelo.libros")
var Prestamos = require("../modelos/modelo.prestamos")

function AgregarUnNuevoLibro(req, res){
   var params = req.body;
   var userId = req.params.idU;
   var ModeloLibros = new Libros();

   /* se verifica que se allan llenado los datos necesarios */
   if(params.palabrasclaves 
    && params.autor 
    && params.nombre 
    && params.edicion 
    && params.Temas
    && params.tipo){

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

                            // Se realiza la separación de datos de las palabras claves
                            var texto = params.palabrasclaves
                            var temas = params.Temas
                            var posicion1 = texto.indexOf(",")
                            var arraydatos = []
                            var arraytemas = []

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

                            // Se realiza la separación de datos de los temas
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

                            // se gurda el nuevo libro
                            ModeloLibros.imagen = params.imagen;
                            ModeloLibros.autor = params.autor;
                            ModeloLibros.nombre = params.nombre;
                            ModeloLibros.edicion = params.edicion;
                            ModeloLibros.descripcion = params.descripcion;
                            ModeloLibros.copias = params.copias;
                            ModeloLibros.Dispobles = params.copias;
                            ModeloLibros.palabrasclaves = arraydatos;
                            ModeloLibros.Temas = arraytemas;
                            ModeloLibros.frecuenciaactual = params.frecuenciaactual;
                            ModeloLibros.ejemplares = params.ejemplares;
                            ModeloLibros.vecesvisto = 0;
                            
                            if(params.tipo){
                                ModeloLibros.tipo = params.tipo
                            }else{
                                ModeloLibros.tipo = "Libro"
                            }



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
    var params = req.body.palabrasclaves
    
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

    Libros.find({tipo: "Libro"}, (err, UsuariosEncontrados) => {
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!UsuariosEncontrados) return res.status(500).send({mensaje: 'Error al obtener los libros'})
        if(UsuariosEncontrados <= 0){
            return res.status(404).send({mensaje: 'No hay ningun libro'})
        }else{
            return res.status(200).send(UsuariosEncontrados)
        }
    }).sort({autor:1});
}

function ObtenerTodasLasRevistas(req, res){

    Libros.find({tipo: "Revistas"}, (err, UsuariosEncontrados) => {
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!UsuariosEncontrados) return res.status(500).send({mensaje: 'Error al obtener los libros'})
        if(UsuariosEncontrados <= 0){
            return res.status(404).send({mensaje: 'No hay ningun libro'})
        }else{
            return res.status(200).send(UsuariosEncontrados)
        }
    }).sort({autor:1});
}

function ObtenerUnSoloLibro(req, res){

    var userId = req.params.idU

    Libros.findOne({ _id: userId}, (err, usuariosEncontrado) =>{
        if (err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!usuariosEncontrado) return res.status(404).send({mensaje: "No hay libro con este código de registro"});
        var params = usuariosEncontrado.vecesvisto +1
        Libros.findByIdAndUpdate(userId, {vecesvisto: params}, {new: true}, (err, libroeditado) => {
            if(err) return res.status(500).send({mensaje: 'Error en la petición de editar'})
            if(!libroeditado) return res.status(404).send({mensaje: 'No se ha podido actualizar el libro'})
            return res.status(200).send(libroeditado)
        })
    })  
}

function ObtenerDocumentosMasVistos(req, res){
    Libros.find((err, UsuariosEncontrados) => {
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
        if(!UsuariosEncontrados) return res.status(500).send({mensaje: 'Error al obtener los libros'})
        if(UsuariosEncontrados <= 0){
            return res.status(404).send({mensaje: 'No hay ningun libro'})
        }else{
            return res.status(200).send(UsuariosEncontrados)
        }
    }).sort({vecesvisto:1}).limit(5);
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

function ELiminarUnLibro(req, res){
    var userId = req.params.idU
    var Eid = req.params.IdE

    Usuario.findOne({ _id: userId, rol: "admin"}, (err, usuariosEncontrado) =>{
        if (err) return res.status(404).send({mensaje: "Error en la petición de busqueda"});
        if(!usuariosEncontrado) return res.status(404).send({mensaje: "No tienes permiso para realizar esta petición"});

        Libros.findByIdAndDelete(Eid, (err, eliminarusuario) => {
            if(err) return res.status(500).send({mensaje: 'Error en la petición de eliminar'})
            if(!eliminarusuario) return res.status(404).send({mensaje: 'No se ha podido eliminar el libro'})
            return res.status(200).send({mensaje: 'Su libro fue eliminado exitosamente'})
        })
    })
}


function PrestarLibros(req, res){

    var libroid = req.params.idl
    var userid = req.params.idU
    var params = req.body;
    var ModeloPrestamos = new Prestamos();
    var fecha = new Date();


    Usuario.findOne({ _id: userid}, (err, usuariosEncontrado) =>{
        if (err) return res.status(500).send({mensaje: "Error en la petición de busqueda"});
        if(!usuariosEncontrado) return res.status(404).send({mensaje: "Este usuario no existe en la base de datos"});

        if(usuariosEncontrado.librosprestados >= 10){
            return res.status(404).send({mensaje: "Ya no puedes prestar más documentos"});
        }else{
            Libros.findOne({ _id: libroid}, (err, libroencontrado) =>{
                if (err) return res.status(500).send({mensaje: "Error en la petición de busqueda"});
                if(!libroencontrado) return res.status(404).send({mensaje: "Este libro no existe en la base de datos"});
        
                Prestamos.findOne({iduser: userid, idlibro: libroid, estado : "devuelto"}, (err, prestamoencontrado) =>{
                    if (err) return res.status(500).send({mensaje: "Error en la petición de busqueda"});
                    if(prestamoencontrado){
                        return res.status(404).send({mensaje: "Ya tienes este libro"});
                    }else{
                        ModeloPrestamos.iduser = userid;
                        ModeloPrestamos.idlibro = libroid;
                        ModeloPrestamos.imagen = libroencontrado.imagen;
                        ModeloPrestamos.autor = libroencontrado.autor;
                        ModeloPrestamos.nombre = libroencontrado.nombre;
                        ModeloPrestamos.edicion = libroencontrado.edicion;
                        ModeloPrestamos.tipo = libroencontrado.tipo;
                        ModeloPrestamos.estado = "prestado";
                        ModeloPrestamos.fechadesolicitud = fecha.toLocaleDateString();
                        ModeloPrestamos.fechadeentrega = "";

                        params.librosprestados = usuariosEncontrado.librosprestados +1;

                        Usuario.findByIdAndUpdate(userid, params, {new: true}, (err, editarusuario) => {
                            if(err) return res.status(500).send({mensaje: 'Error en la petición de editar'})
                            if(!editarusuario) return res.status(404).send({mensaje: 'No se ha podido actualizar el usuario'})
                            ModeloPrestamos.save((err, PrestamosSave) => {
                                if(err) res.status(500).send({mensaje:"Error en la petición de guardado"})
                                if(!PrestamosSave) res.status(404).send({mensaje: "No se a podido guardar su libro"})
                                return res.status(200).send(PrestamosSave)
                            })
                        })
                    }
                })
            })
        }
    })
}

function devolverlibro(req, res){
    var libroid = req.params.idl
    var fecha = new Date();
    var params = req.body;
    params.fechadeentrega = fecha.toLocaleDateString();
    params.estado = "devuelto";

    Prestamos.findByIdAndUpdate(libroid, params, {new: true}, (err, editarusuario) => {
        if(err) return res.status(500).send({mensaje: 'Error en la petición de editar'})
        if(!editarusuario) return res.status(404).send({mensaje: 'No se ha podido actualizar el prestamo'})
        return res.status(200).send(editarusuario)
    })
}

function ObtenerUnSoloPrestamo(req,res){
    var libroid = req.params.idl
    Prestamos.findOne({ _id: libroid},(err, libroeditado) => {
        if(err) return res.status(500).send({mensaje: 'Error en la petición de busqueda'})
        if(!libroeditado) return res.status(404).send({mensaje: 'No existe hay documentos con este código'})
        return res.status(200).send(libroeditado)
    })
}

function ObtenerPrestamosPorUsuario(req,res){
    var Userid = req.params.idU
    Prestamos.find({ iduser: Userid},(err, libroeditado) => {
        if(err) return res.status(500).send({mensaje: 'Error en la petición de editar'})
        if(!libroeditado) return res.status(404).send({mensaje: 'No existe hay prestamos echos por este usuario'})
        return res.status(200).send(libroeditado)
    })
}

module.exports = {
    AgregarUnNuevoLibro,
    buscarporpalabrasclaves,
    ObtenerTodosLosLibros,
    ObtenerUnSoloLibro,
    ObtenerTodasLasRevistas,
    EditarLibros,
    ELiminarUnLibro,
    PrestarLibros,
    devolverlibro,
    ObtenerDocumentosMasVistos,
    ObtenerUnSoloPrestamo,
    ObtenerPrestamosPorUsuario
}