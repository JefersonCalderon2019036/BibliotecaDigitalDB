const mongooes = require("mongoose");
var Schema = mongooes.Schema;

var ModeloRevistas = Schema({
    imagen: String,
    autor: String,
    titulo: String,
    edicion: String,
    descripcion: String,
    frecuenciaactual: String,
    ejemplares: Number,
    copias: Number,
    Dispobles: Number,
    RevistasPrestadas: Number,
    Temas: [],
    palabrasclaves: []
})

module.exports = mongooes.model("Revistas", ModeloRevistas)