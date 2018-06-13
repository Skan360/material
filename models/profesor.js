'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfesorSchema = Schema({
	profesor_name: String,
	profesor_first_last_name: String,
	profesor_second_last_name: String,
	rfc: String,
	assignment: {type:Schema.ObjectId,ref:'Assignment'},

});

module.exports=mongoose.model('Profesor',ProfesorSchema);