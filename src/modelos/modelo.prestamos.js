const mongooes = require("mongoose");
var Schema = mongooes.Schema;

var ModeloPrestamos = Schema({
    iduser: String,
    idlibro: String,
    imagen: String,
    autor: String,
    nombre: String,
    edicion: String,
    tipo: String,
    estado: String,
    fechadesolicitud: String,
    fechadeentrega: String
})

module.exports = mongooes.model("Prestamos", ModeloPrestamos)