"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "BibliotecaDigitalKinalGTDB2019036"

exports.createToken = function (Usuario){
    var playload = {
        imagen: String,
        carnet: Number,
        nombre: String,
        apellido: String,
        rol: String,
        iat: moment().unix(),
        exp: moment().day(24, "hour").unix()
    }

    return jwt.encode(playload, secret);
}