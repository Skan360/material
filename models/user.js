'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name:String,
	email: String,
	password:String,
	assignment_name:String,
	role:String,
	template: {type:Schema.ObjectId,ref:'Template'},
	assignment: {type:Schema.ObjectId,ref:'Assignment'},
	image:String
});

module.exports=mongoose.model('User',UserSchema);