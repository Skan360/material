'use strict'
//modulos
var fs = require('fs');
var path = require('path');
//modelos
var Profesor = require('../models/profesor');

//acciones o funciones

//Obtener nombres de todos las profesores
function getNameProfesors(req,res){
	var assignment = req.params.assignment;
	Profesor.find({assignment: assignment},(err,profesors)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar profesores'});
			}else{
				if(profesors){
					res.status(200).send({profesors});	
				}
				else{
					res.status(404).send({message:'asignatura no existente'});
				}
			}
		});
}




//exportar funciones
module.exports = {
	getNameProfesors
};