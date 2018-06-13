//uso para el nuevo tipo de javascript
'use strict'
//modulos
var fs = require('fs');
var path = require('path');
//modelos a utilizar
var Assignment = require('../models/assignment');

//Obtener datos de todas las asignaturas
function getInfoAssignments(req,res){
	Assignment.find({}).exec((err,assignments)=>{
		if(err){//error en la petición
			res.status(500).send({message:'Error de asignaturas'});
		}else{
			if(!assignments){//si no hay asignaturas
				res.status(500).send({message:'No hay asignaturas'});
			}else{//en caso de que haya asignaturas
				res.status(200).send({assignments});
			}
		}
	});
}

//Obtener datos de una asignatura
function getInfoAssignment(req,res){
	var assignment_name = req.params.assignment_name;//variable a evaluar para obtener los datos de la asignatura
	Assignment.findOne({assignment_name:assignment_name},(err,assignment)=>{//Consulta a la bd con respecto al atributo del nombre de la asignatura
		if(err){//si hay error en la petición
				res.status(500).send({message:'Error al comprobar usuario'});
		}else{
			if(assignment){//si encontro una concordancia con el nombre que se le envió
				res.status(200).send({assignment});	
			}
			else{//si no hay una asignatura con ese nombre
					res.status(404).send({message:'asignatura no existente'});
			}
		}
	});
}



//Modificar Assignment seleccionado
function updateAssignment(req,res){

	var assignmentId = req.params.id;
	var update = req.body;
	console.log(assignmentId);
	console.log(update);

	Assignment.findByIdAndUpdate(assignmentId,update,{new:true},(err,assignmentUpdated)=>{
		if(err){
			res.status(500).send({message:'Error al actualizar datos de asignatura'});
		}else{
			if(!assignmentUpdated){	
				res.status(500).send({message:'No se pudo actualizar datos de asignatura'});
			}else{
				res.status(200).send({template: assignmentUpdated});
			}
		}
	});
}

//exportar funciones a utilizar para hacer la consulta con la bd
module.exports = {
	getInfoAssignments,
	getInfoAssignment,
	updateAssignment
};