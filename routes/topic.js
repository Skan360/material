'use strict'

var express = require('express');
var TopicController = require('../controllers/topic');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');



api.get('/getInfoTopics/:assignment',TopicController.getInfoTopics);




module.exports = api;