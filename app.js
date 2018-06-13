'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//cargar rutas

var user_routes = require('./routes/user');
var template_routes = require('./routes/template');
var assignment_routes = require('./routes/assignment');
var material_routes = require('./routes/material');
var topic_routes = require('./routes/topic');
var subtopic_routes = require('./routes/subtopic');
var profesor_routes = require('./routes/profesor');
var request_routes = require('./routes/request');


//middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//configurar cabeceras y cors
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
	res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
	next();
});

//rutas base
app.use('/',user_routes);
app.use('/',template_routes);
app.use('/',assignment_routes);
app.use('/',material_routes);
app.use('/',topic_routes);
app.use('/',subtopic_routes);
app.use('/',profesor_routes);
app.use('/',request_routes);


//test heroku
app.use(express.static(path.join(__dirname,'public')));
app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'public/index.html'));
});


//Configurar cabeceras y cores





module.exports=app;