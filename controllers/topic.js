'use strict'
//modulos
var fs = require('fs');
var path = require('path');
//modelos
var Topic = require('../models/topic');

//acciones o funciones


function getInfoTopics(req,res){
	var assignment = req.params.assignment;
	Topic.find({assignment:assignment},(err,topics)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar usuario'});
			}else{
				if(topics){
					res.status(200).send({topics});	
				}
				else{
					//res.status(404).send({message:'asignatura no existente'});
				}
			}
		});
}



//exportar funciones
module.exports = {
	getInfoTopics
};