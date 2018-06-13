'use strict'

var express = require('express');
var SubtopicController = require('../controllers/subtopic');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');



api.get('/getInfoSubtopics/:topic',SubtopicController.getInfoSubtopics);




module.exports = api;