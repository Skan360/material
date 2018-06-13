'use strict'
//modulos
var fs = require('fs');
var path = require('path');
//modelos
var Subtopic = require('../models/subtopic');

//acciones o funciones

function getInfoSubtopics(req,res){
	var topic = req.params.topic;
	Subtopic.find({topic:topic},(err,subtopics)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar temas'});
			}else{
				if(subtopics){
					res.status(200).send({subtopics});	
				}
				else{
					//res.status(404).send({message:'asignatura no existente'});
				}
			}
		});
}



//exportar funciones
module.exports = {
	getInfoSubtopics
};