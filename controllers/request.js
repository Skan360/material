//uso para el nuevo tipo de javascript
'use strict'

//modulos
var fs = require('fs');
var path = require('path');

//modelos requeridos para ejectur las funciones concernientes
var User = require('../models/user');
var Material = require('../models/material');
var Assignment = require('../models/assignment');
var Subtopic = require('../models/subtopic');
var Request = require('../models/request');

//servicio jwt
var jwt = require('..//services/jwt');

//funciones
function saveRequest(req,res){
	//Crear objeto usuario
	var request = new Request();
	//Recibir los parametros
	var params = req.body;

	if (params.name) {
		request.assignment_id=params.assignment_id;
		request.material_id=params.material_id;
		request.justification=params.justification;
		request.estatus='Pendiente';
		//asignacion de una variable para posteriormente hacer una consulta para ver que no tenga el mismo nombre el material
		var subtopicId = params.subtopic;
		request.profesor_name=params.profesor_name;
		request.tipoET=params.tipoET;
		request.file_name=params.file_name;
		request.name= params.name;
		
		//Consulta para buscar si hay un subtopic existe
		Subtopic.findById(subtopicId,(err,issetSubtopic)=>{
			if(err){//error en la consulta
				res.status(500).send({message:'Error al comprobar subtema'});
			}else{
				if(issetSubtopic){//si el subtema elegido es correcto
					request.subtopic=issetSubtopic.name;
					request.save((err,requestStored)=>{
						if(err){
							res.status(500).send({message:'Error en el servidor'});
						}else{
							if(!requestStored){
								res.status(500).send({message:'No se guardo la peticion'});
							}else{
								res.status(200).send({request:requestStored});
							}
						}
					});
				}else{
					//res.status(500).send({message:'Error'});
				}
			}
		});
	}else{
		res.status(200).send({
			message:'Introduce todos los datos para agregar la peticion'
		});
	}
}


function getRequests(req,res){
	var assignment_id = req.params.assignment_id;
	Request.find({assignment_id:assignment_id}).exec((err,requests)=>{
		if(err){
			res.status(500).send({message:'Error de requests'});
		}else{
			if(!requests){
				res.status(500).send({message:'No hay requests'});
			}else{
				res.status(200).send({requests});
			}
		}
	});
}

//Modificar datos usuario
function updateRequest(req,res){
	var requestId = req.params.id;
	var estatusnew = req.params.estatusnew;
	Request.findByIdAndUpdate(requestId,{estatus:estatusnew},{new:true},(err,requestUpdated)=>{
		if(err){
			res.status(500).send({message:'Error al actualizar datos'});
		}else{
			if(!requestUpdated){	
				res.status(500).send({message:'No se pudo actualizar datos'});
			}else{
				res.status(200).send({request: requestUpdated});
			}
		}
	});
}
//exportar funciones
module.exports = {
	saveRequest,
	getRequests,
	updateRequest
};