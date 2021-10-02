const mongooes = require("mongoose");
var Schema = mongooes.Schema;

var ModeloUsuario = Schema({
    imagen: String,
    carnet: Number,
    nombre: String,
    apellido: String,
    usuario: String,
    correoelectronico: String,
    contrasena: String,
    rol: String,
    librosprestados: Number,
    cantidaddedocuentosprestados: Number
})

module.exports = mongooes.model("Usuarios", ModeloUsuario)