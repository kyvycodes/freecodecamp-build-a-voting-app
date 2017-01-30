'use strict';

var path = process.cwd();
var PoolsController = require(path + '/app/controllers/polls-controller.js');

module.exports = function(app, passport) {
	var pollsCtrl = new PoolsController();
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	app.route('/')
		.get(isLoggedIn, (req, res) => {
			res.sendFile(path + '/public/index.html');
		});
	
	app.route('/login')
		.get((req, res) => {
			res.sendFile(path + '/public/login.html');
		});
		
	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/login');
		});
	
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	
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