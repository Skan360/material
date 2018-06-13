'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function(user){
	var payload = { //genera el cifrado o token
		sub: user._id, //id del usuario
		name: user.name,
		assignment: user.assignment,
		email: user.email,
		role: user.role,
		iat: moment().unix(),//creacion token
		exp: moment().add(30,'days').unix //expiracion token
	};
	return jwt.encode(payload,secret);
};