'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssignmentSchema = Schema({
	assignment_name: String,
	template_select: String,
	catalog_profesor: String,
	clave_assignment: String//NUEVO
});

module.exports=mongoose.model('Assignment',AssignmentSchema);