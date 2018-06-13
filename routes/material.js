'use strict'

var express = require('express');
var MaterialController = require('../controllers/material');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/materials'});

api.post('/saveMaterial',md_upload,MaterialController.saveMaterial);
api.post('/uploadFile/:id',md_upload,MaterialController.uploadFile);
api.get('/getFile/:file',MaterialController.getFile);
api.delete('/deleteMaterial/:id',md_auth.ensureAuth,MaterialController.deleteMaterial);
api.get('/getInfos/:subtopic_id/:type',MaterialController.getInfos);
api.get('/getInfoSubtopics',MaterialController.getInfoSubtopics);
api.delete('/deleteMaterial/:id/:path',md_auth.ensureAuth,MaterialController.deleteMaterial);


module.exports = api;