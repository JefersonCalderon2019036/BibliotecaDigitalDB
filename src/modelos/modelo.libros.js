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
    Temas: [{temas: String}],
    palabrasclaves: [{palabras: String}],
    Usuarios: [{idusuario:String, 
                Nombre: String, 
                Apellido: String,
                FechadeSalida: String,
                FechadeEntrega: String,
                estado: String}]
})

module.exports = mongooes.model("Libros", ModeloDeLibros)