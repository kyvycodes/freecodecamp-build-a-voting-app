'use strict';

var path = process.cwd();
var PoolsController = require(path + '/app/controllers/polls-controller.js');
var UsersController = require(path + '/app/controllers/users-controller.js');

module.exports = function(app, passport) {
	var pollsCtrl = new PoolsController();
	var usersCtrl = new UsersController();

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.status(401).json({code: 401, message: "not authenticate"}).end();
		}
	}
	
	app.route('/polls/:poll_id')
		.get((req, res) => {
			res.sendFile(path + '/public/index.html');
		});
	app.route('/')
		.get((req, res) => {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/');
		});
	
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
	
	app.route('/api/users/:id')
		.get(isLoggedIn, usersCtrl.profile);
	//Poll routes

	app.route('/api/:id/polls')
		.post(isLoggedIn, pollsCtrl.add);

	app.route('/api/:id/polls/:poll_id')
		.delete(isLoggedIn, pollsCtrl.remove);
	
	app.route('/api/polls')
		.get(pollsCtrl.index);

	app.route('/api/polls/:poll_id')
		.get(pollsCtrl.view);

	app.route('/api/polls/:poll_id/vote')
		.post(pollsCtrl.vote);
}