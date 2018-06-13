'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubtopicSchema = Schema({
	name: String,
	num_topic: String,
	topic: {type:Schema.ObjectId,ref:'Topic'}
});

module.exports=mongoose.model('Subtopic',SubtopicSchema);