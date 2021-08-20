"use strict"

//Variables Globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser")


//Middlewars
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



//Exportar
module.exports = app;