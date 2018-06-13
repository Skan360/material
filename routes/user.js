'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/prueba'});
var md_upload_catalog_profesor = multipart({uploadDir: './uploads/catalog_profesor'});//AGREGAR A NUEVA VERSION

api.post('/register',UserController.saveUser);
api.post('/login',UserController.login);
api.put('/updatePassword/:id/:password',UserController.updatePassword);//AGREGAR A NUEVA VERSION
api.get('/getInfo',UserController.getInfo);
api.post('/uploadImage/:id',md_upload,UserController.uploadImage);
api.get('/getMaster/:assignment_name',UserController.getMaster);
api.get('/getImage/:assignment_name',UserController.getImage);
api.get('/getsImage/:file_name',UserController.getsImage);
api.post('/uploadNewImage/:id/:path',md_upload,UserController.uploadNewImage);
api.post('/updateCatalogProfesorsCommit/:assignment/:path',md_upload_catalog_profesor,UserController.updateCatalogProfesorsCommit);

module.exports = api;
