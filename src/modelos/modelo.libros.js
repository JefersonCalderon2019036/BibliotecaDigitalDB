const mongooes = require("mongoose");
var Schema = mongooes.Schema;

var ModeloDeLibros = Schema({
    imagen: String,
    autor: String,
    nombre: String,
    edicion: String,
    descripcion: String,
    copias: Number,
    Dispobles: Number,
    Temas: [],
    palabrasclaves: [],
    tipo: String,
    frecuenciaactual: String,
    ejemplares: String,
    vecesvisto: Number,
    cantidaddedocuentosprestados: Number
})

module.exports = mongooes.model("Libros", ModeloDeLibros)