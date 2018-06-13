'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = Schema({
	name:String,
	tipoET:String,
	profesor_name:String,
	subtopic: String,
	estatus: String,
	justification: String,
	material_id: String,
	file_name: String,
	assignment_id:{type:Schema.ObjectId,ref:'Assignment'}

});

module.exports=mongoose.model('Request',RequestSchema);