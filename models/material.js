'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialSchema = Schema({
	name:String,
	tipoET:String,
	tipoVD:String,
	file:String,
	profesor:String,
	subtopic_id: String,
	dificultad: String,
	link: String
});

module.exports=mongoose.model('Material',MaterialSchema);