'use strict';

var path = process.cwd();
var User = require("../models/User.js");
var userController = require("../controllers/user.controller.js");

var poll = require("../models/poll.js");


module.exports = function(app) {

	app.use('/api/*', userController.jwtAuth);

	app.route('/register').post(userController.register);

	app.post('/auth', userController.auth);

	app.route('/').get(function(req, res) {
		res.sendFile(path + '/public/index.html');
	});


};
