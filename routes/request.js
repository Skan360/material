'use strict'

var express = require('express');
var RequestController = require('../controllers/request');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/saveRequest',RequestController.saveRequest);
api.get('/getRequests/:assignment_id',RequestController.getRequests);
api.put('/updateRequest/:id/:estatusnew',md_auth.ensureAuth,RequestController.updateRequest);



module.exports = api;