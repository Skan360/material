'use strict'

var express = require('express');
var TemplateController = require('../controllers/template');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');



api.put('/update_template/:id',md_auth.ensureAuth,TemplateController.updateTemplate);
api.get('/getInfoTemplate/:assignment_id',TemplateController.getInfoTemplate);




module.exports = api;
