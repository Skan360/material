'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorialProfesorSchema = Schema({
	profesor_name: String,
	profesor_first_last_name: String,
	profesor_second_last_name: String,
	semestre: [[String,String,String]],
	fecha_creacion: String,
	rfc: String

});

module.exports=mongoose.model('HistorialProfesor',HistorialProfesorSchema);