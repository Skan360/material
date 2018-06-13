'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemplateSchema = Schema({
	assignment_name:String,
	style_menu:{ backgroundColor:String, color:String, fontFamily:String },
	style_body:{ backgroundColor:String, color:String, fontFamily:String },
	logos:{ unam:String, fi:String, assig:String },
	assignment:{type:Schema.ObjectId,ref:'Assignment'}
});

module.exports=mongoose.model('Template',TemplateSchema);