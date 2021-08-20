const mongooes = require("mongoose");
var Schema = mongooes.Schema;

var ModeloUsuario = Schema({
    imagen: String,
    carnet: Number,
    nombre: String,
    apellido: String,
    correoelectronico: String,
    contrasena: String,
    rol: String,
    cantidaddelibros: Number,
})

module.exports = mongooes.model("Usuarios", ModeloUsuario)