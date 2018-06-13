'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var a;
//var dateTime = require('node-datetime');
//modelos
var User = require('../models/user');
var Template = require('../models/template');
var Assignment = require('../models/assignment');
var Profesor = require('../models/profesor');
var HistorialProfesor = require('../models/historial_profesor');
//servicio jwt
var jwt = require('..//services/jwt');

//acciones o funciones
//funcion de prueba

//require the csvtojson converter class 
var csv = require("csvtojson");
// create a new converter object

function updateCatalogProfesorsCommit(req,res){
	var path=req.params.path;
	var assignment=req.params.assignment;
	var assignment_name;
	var clave_assignment;
	csv({ignoreEmpty:true})
  	.fromFile('./uploads/catalog_profesor/'+path)
  	.on("end_parsed",function(jsonArrayObj){ 
  	//Para los profesores
    for (var i = jsonArrayObj.length - 1; i >= 0; i--) {
    	jsonArrayObj[i].assignment=assignment;
    }
    //Profesor.find({ assignment:assignment }).remove().exec();
	Profesor.insertMany(jsonArrayObj, function(error, docs) {});
	//Para el historial de profesores
	
	Assignment.findById(assignment,(err,assignment)=>{
		if(err){//si hay error en la petición
				res.status(500).send({message:'Error al comprobar asignatura'});
		}else{
			if(assignment){//si encontro una concordancia con el id que se le envió
				assignment_name= assignment.assignment_name;
				clave_assignment= assignment.clave_assignment;
				/*var dt = dateTime.create();
				var fecha_creacion = dt.format('d-m-Y H:M:S');
				var mes = dt.format('m');
				if(mes=='01'||mes=='02'||mes=='03'||mes=='04'||mes=='05'){
					var semestre = dt.format('Y')+'-1';
				}else{
					var semestre = dt.format('Y')+'-2';
				}*/
				
				for (var i = jsonArrayObj.length - 1; i >= 0; i--) {
					//if del curp para ver si ya existe el usuario en el historial
					var historial = new HistorialProfesor();
					profesor_name:String;
					profesor_name:String;
					profesor_first_last_name:String;
					profesor_second_last_name:String;
					rfc:String;
					var auxArray=[]
					auxArray.push(semestre,assignment_name,clave_assignment);
					//jsonArrayObj[i].semestre=auxArray;
					var profesor_name=jsonArrayObj[i].profesor_name;
					var profesor_first_last_name=jsonArrayObj[i].profesor_first_last_name;
					var profesor_second_last_name=jsonArrayObj[i].profesor_second_last_name;
					var rfc=jsonArrayObj[i].rfc
					//historial.semestre.push(auxArray);
					//res.status(200).send({message:historial})
					//HistorialProfesor.findOneAndUpdate({rfc:historial.rfc},{"$push": { "semestre": auxArray } },(err,historialStored)=>{
					HistorialProfesor.findOneAndUpdate({rfc:jsonArrayObj[i].rfc},{"$push": { "semestre": auxArray } },(err,historialStored)=>{
						if(err){//si hay error en la petición
							//res.status(500).send({message:'Error al comprobar historial'});
						}else{
							if(!historialStored){//si encontro una concordancia con el nombre que se le envió
								
								auxArray.push(semestre,assignment_name,clave_assignment);
								historial.profesor_name=profesor_name;
								historial.profesor_first_last_name=profesor_first_last_name;
								historial.profesor_second_last_name=profesor_second_last_name;
								historial.rfc=rfc;
								historial.semestre.push(auxArray);
								historial.save();
							}
							else{//si no hay historial de ese profesor
								//historial.save();
							}
						}
					});
			    }

			    //HistorialProfesor.insertMany(jsonArrayObj, function(error, docs) {});
				res.status(200).send({i});

			}
			else{//si no hay una asignatura con ese nombre
				res.status(404).send({message:'asignatura no existente'});
			}
		}
	});
   })
}


//Obtener id del maestro
function getMaster(req,res){
	var assignment_name = req.params.assignment_name;//variable a evaluar para obtener los datos de la asignatura
	User.find({assignment_name:assignment_name,role:"ROLE_MAESTRO"},(err,user2)=>{//Consulta a la bd con respecto al atributo del nombre de la asignatura
			if(err){//si hay error en la petición
				res.status(500).send({message:'Error al comprobar usuario'});
			}else{
				if(user2){//si encontro una concordancia con el nombre que se le envió
					res.status(200).send({user2});	
				}
				else{//si no hay una usuario con ese nombre
					res.status(404).send({message:'usuario maestro no existente'});
				}
			}
		});
}
//funcion de envio de datos de nuevo usuario (registro)
function saveUser(req,res){
	//Crear objeto usuario
	var user = new User();
	var user2 = new User();
	var template = new Template();
	var assignment = new Assignment();
	//Recibir los parametros
	var params = req.body;
	//valor del objeto
	//admin-maestro y maestro
	if (params.password && params.name && params.email && params.assignment_name) {
		//admin-maestro valores
		user.name= "admin-"+params.name;
		user.email=params.email;
		user.role="ROLE_ADMIN_MAESTRO";
		user.image=null;
		user.assignment_name=params.assignment_name;
		//maestro valores
		user2.name= params.name;
		user2.role="ROLE_MAESTRO";
		user2.image=null;
		user2.assignment_name=params.assignment_name;
		//template valores por default
		template.style_menu.backgroundColor ="green";
		template.style_menu.color = "black";
		template.style_menu.fontFamily = "Helvetica";
		template.style_body.backgroundColor ="white";
		template.style_body.color = "black";
		template.style_body.fontFamily = "Helvetica";
		template.logos.fi = "fi1.png";
		template.logos.unam = "unam1.png";
		template.logos.assig = "pi2.jpg";
		template.assignment_name=params.assignment_name;
		//assignment
		assignment.assignment_name=params.assignment_name;
		assignment.template_select = "first";
		//NUUEVO
		assignment.clave_assignment = params.clave_assignment;
		assignment.catalog_profesor=null;
		User.findOne({assignment_name:user.assignment_name},(err,issetUser)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar asignatura'});
			}else{
				if(!issetUser){
					//guardar template
					assignment.save((err4,userStored4)=>{
						if (err) {

						} else{
							if(!userStored4){

							}else{
								template.assignment=userStored4.id;
								template.save((err3,userStored3)=>{
								if(err){
									//res.status(500).send({message:'Error al guardar usuario'});
								}else{
									if(!userStored3){
										//res.status(404).send({message:'No se ha registrado el usuario'});
									}else{
										user.template=userStored3.id;
										user.assignment=userStored4.id;
										user2.assignment=userStored4.id;
										user2.template=userStored3.id;
										//admin-maestro
										//cifrar password
										bcrypt.hash(params.password,null,null,function(err,hash){
											user.password=hash;
											//guardar user en bd
											user.save((err,userStored)=>{
												if(err){
													//res.status(500).send({message:'Error al guardar usuario'});
												}else{
													if(!userStored){
														//res.status(404).send({message:'No se ha registrado el usuario'});
													}else{
														res.status(200).send({user:userStored});
													}
												}
											});
										});
										//maestro
										//cifrar password
										bcrypt.hash(params.password,null,null,function(err,hash){
											user2.password=hash;
											//guardar user en bd
											user2.save((err2,userStored2)=>{
												if(err){
													//res.status(500).send({message:'Error al guardar usuario'});
												}else{
													if(!userStored2){
														//res.status(404).send({message:'No se ha registrado el usuario'});
													}else{
														//res.status(200).send({user2:userStored2});
													}
												}
											});
										});
									}
								}
							});
							}
						}
					});
				}
				else{
					res.status(404).send({message:'Asignatura ya existente'});
				}
			}
		});
	}else{
		res.status(200).send({
			message:'Introduce todos los datos para registrarse'
		});
	}
}

//funcion de login
function login (req,res) {
	var params = req.body;
	var name = params.name;
	var password = params.password;
	
	User.findOne({name:name},(err,user)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar usuario'});
			}else{
				if(user){
					bcrypt.compare(password,user.password,(err,check)=>{
						if(check){
							//comprobar y generar token
							if(params.gettoken){
								//devolver token
								res.status(200).send({
									token:jwt.createToken(user)
								});
							}else{
								res.status(200).send({user});
							}
						}else{
							res.status(404).send({message:'Usuario password incorrecta'});
						}
					});
					
				}
				else{
					res.status(404).send({message:'Usuario no existe'});
				}
			}
		});

}

//Modificar password usuario
function updatePassword(req,res){
	
	var assignment_id = req.params.id;
	var passwordAdmin = req.params.password;
	var password = req.params.password;

	bcrypt.hash(passwordAdmin,null,null,function(err,hashAdmin){
		User.findOneAndUpdate({assignment:assignment_id,role:"ROLE_ADMIN_MAESTRO"},{password:hashAdmin},{new:true},(err,useraUpdated)=>{
			if(err){
				res.status(500).send({message:'Error al cargar imagen'});
			}else{	
				if(!useraUpdated){	
					//res.status(500).send({message:'No se pudo guardar la imagen 1'});
					
				}else{
					//res.status(200).send({user: userUpdated});
					console.log('hola');
				}
			}
		});
	});
	
	bcrypt.hash(password,null,null,function(err,hash){
		User.findOneAndUpdate({assignment:assignment_id,role:"ROLE_MAESTRO"},{password:hash},{new:true},(err,userbUpdated)=>{
			if(err){
				res.status(500).send({message:'Error al cargar imagen'});
			}else{	
				if(!userbUpdated){	
					//res.status(500).send({message:'No se pudo guardar la imagen 1'});
				}else{
					console.log('mundo');
					res.status(200).send({user: userbUpdated});
				}
			}
		});
	});
}


function getInfo(req,res){
	User.find({role:'ROLE_MAESTRO'}).populate({path:'template'}).exec((err,users)=>{
		if(err){
			res.status(500).send({message:'Error peticion'});
		}else{
			if(!users){
				res.status(500).send({mesagge:'No hay registros'});
			}else{
				res.status(200).send({users});
			}
		}
	});
}

function uploadImage(req,res){
	var userId=req.params.id;
	//obtener la materia del profesor administrador
	var user2Id=req.params.id_maestro;

	var file_name = 'No subir';
	//console.log(req.files);
	if(req.files){
		var file_path = req.files.image.path;
		//EN CASO DE USAR LINUX
		var file_split = file_path.split('/');
		//EN CASO DE USAR WINDOWS
		//var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		if(file_ext=='png' || file_ext=='jpg'|| file_ext=='jpge' || file_ext=='gif'|| file_ext=='PNG' || file_ext=='JPG' || file_ext=='JPGE' || file_ext=='GIF'){
			//if(materialId != req.user.sub){
			//	return res.status(500).send({message:'Error no tienes permiso para subir material'});
			//}else{
				//Para el maestro administrador
				User.findByIdAndUpdate(userId,{image:file_name},{new:true},(err,userUpdated)=>{
					if(err){
						res.status(500).send({message:'Error al cargar imagen'});
					}else{
						if(!userUpdated){	
							res.status(500).send({message:'No se pudo guardar la imagen 1'});
						}else{
							res.status(200).send({user: userUpdated,image:file_name});
						}
					}
				});
			//}
		}else{
			fs.unlink(file_path,(err)=>{
				if(err){
					res.status(200).send({message:'Extension no valida y fichero borrado'});
				}else{
					res.status(200).send({message:'Extension no valida'});
				}
			});

		}

	}else{
		res.status(200).send({message:'No se han subido archivos'});
	}
}

function getImage(req,res){
	var assignment_name = req.params.assignment_name;//variable a evaluar para obtener los datos de la asignatura
	User.find({assignment_name:assignment_name,role:"ROLE_ADMIN_MAESTRO"},(err,user2)=>{//Consulta a la bd con respecto al atributo del nombre de la asignatura
			if(err){//si hay error en la petición
				res.status(500).send({message:'Error al comprobar usuario'});
			}else{
				if(user2){//si encontro una concordancia con el nombre que se le envió
					var file = user2[0].image;
					console.log(file);
					var path_file = './uploads/prueba/'+file;
					fs.exists(path_file,(exists)=>{
					if(exists){
						res.sendFile(path.resolve(path_file));
					}else{
						res.status(404).send({message:'No hay documento con esta URL'});
					}
					});
				}
				else{//si no hay una usuario con ese nombre
					res.status(404).send({message:'usuario maestro no existente'});
				}
			}
		});
}


function getsImage(req,res){
		
	var file = req.params.file_name;//variable a evaluar para obtener los datos de la asignatura 'multi.png';
	//console.log(file);
	var path_file = './uploads/prueba/'+file;
	fs.exists(path_file,(exists)=>{
	if(exists){
		res.sendFile(path.resolve(path_file));
	}else{
		res.status(404).send({message:'No hay documento con esta URL'});
	}
	});

}

function uploadNewImage(req,res){
	var userId=req.params.id;
	//obtener la materia del profesor administrador
	var user2Id=req.params.id_maestro;
	var path='./uploads/prueba/'+req.params.path;
	fs.unlink(path,(err)=>{
				if(err){
					console.log('imagen de perfil vieja borrada');
					//res.status(200).send({message:'Extension no valida y fichero borrado'});
				}else{
					//res.status(200).send({message:'Extension no valida'});
				}
			});
	var file_name = 'No subir';
	if(req.files){
		var file_path = req.files.image.path;
		//EN CASO DE USAR LINUX
		var file_split = file_path.split('/');
		//EN CASO DE USAR WINDOWS
		//var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		if(file_ext=='png' || file_ext=='jpg'|| file_ext=='jpge' || file_ext=='gif'|| file_ext=='PNG' || file_ext=='JPG' || file_ext=='JPGE' || file_ext=='GIF'){
				//Para el maestro administrador
				User.findByIdAndUpdate(userId,{image:file_name},{new:true},(err,userUpdated)=>{
					if(err){
						res.status(500).send({message:'Error al cargar imagen'});
					}else{
						if(!userUpdated){	
							res.status(500).send({message:'No se pudo guardar la imagen 1'});
						}else{
							res.status(200).send({user: userUpdated,image:file_name});
						}
					}
				});
		}else{
			fs.unlink(file_path,(err)=>{
				if(err){
					res.status(200).send({message:'Extension no valida y fichero borrado'});
				}else{
					res.status(200).send({message:'Extension no valida'});
				}
			});

		}

	}else{
		res.status(200).send({message:'No se han subido archivos'});
	}
}


function uploadCatalogProfesor(req,res){
	var assignmentId=req.params.id;
	var file_name = 'No subir';
	//console.log(req.files);
	if(req.files){
		var file_path = req.files.catalog_profesor.path;
		//EN CASO DE USAR LINUX
		var file_split = file_path.split('/');
		//EN CASO DE USAR WINDOWS
		//var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		if(file_ext=='csv'){
				Assignment.findByIdAndUpdate(assignmentId,{catalog_profesor:file_name},{new:true},(err,assignmentUpdated)=>{
					if(err){
						res.status(500).send({message:'Error al cargar imagen'});
					}else{
						if(!assignmentUpdated){	
							res.status(500).send({message:'No se pudo guardar la imagen 1'});
						}else{
							res.status(200).send({assignment: assignmentUpdated,catalog_profesor:file_name});
						}
					}
				});
		}else{
			fs.unlink(file_path,(err)=>{
				if(err){
					res.status(200).send({message:'Extension no valida y fichero borrado'});
				}else{
					res.status(200).send({message:'Extension no valida'});
				}
			});

		}

	}else{
		res.status(200).send({message:'No se han subido archivos'});
	}
}


//exportar funciones
module.exports = {
	updateCatalogProfesorsCommit,
	saveUser,
	login,
	updatePassword,
	getInfo,
	uploadImage,
	getMaster,
	getImage,
	getsImage,
	uploadNewImage,
	uploadCatalogProfesor
};