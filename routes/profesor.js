'use strict'

var express = require('express');
var ProfesorController = require('../controllers/profesor');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');



api.get('/getNameProfesors/:assignment',ProfesorController.getNameProfesors);




module.exports = api;