'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8000;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://skan:skan360@ds257470.mlab.com:57470/material', {useMongoClient:true})
//mongoose.connect('mongodb://192.168.0.5:27017/pagina-test', {useMongoClient:true})
	.then(()=>{
			console.log("Conexion a la BD correcta");
			app.listen(port,()=>{
				console.log("servidor local Node y Express conectado: "+ port);
			})
	})
	.catch(err=>console.log(err));

