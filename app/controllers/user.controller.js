'use strict';

var User = require("../models/User.js");
var jwt = require('jsonwebtoken');

require('dotenv').load();

exports.jwtAuth = function(req, res, next) {
    	// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];


		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token, process.env.SECRET, function(err, decoded) {
				if (err) {
					return res.json({
						success: false,
						message: 'Failed to authenticate token.'
					});
				}
				else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					next();
				}
			});

		}
		else {

			// if there is no token
			// return an error
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});

		}
}


exports.register =  function (req, res) {
		// create a sample user
	var newUser = new User({
		name: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	// save the sample user
	newUser.save(function(err) {
		if (err) {
			res.json({
				success: false,
				message: "User Name Already Exists!"
			});
		}
		else {
			res.json({
				success: true
			});
		}
	});
}

exports.auth = function (req, res) { 
    	//console.log(req.body.username);
		User.findOne({
			name: req.body.username
		}, function(err, user) {

			if (err) throw err;

			if (!user) {
				res.json({
					success: false,
					message: 'Authentication failed. User not found.'
				});
			}
			if (user) {

				// check if password matches
				if (user.password != req.body.password) {
					res.json({
						success: false,
						message: 'Authentication failed. Wrong password.'
					});
				}
				else {

					// if user is found and password is right
					// create a token
					var token = jwt.sign(user, process.env.SECRET, {
						expiresIn: "1d" // expires in 24 hours
					});

					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token,
						userName: req.body.username
					});
				}

			}

		});
}

