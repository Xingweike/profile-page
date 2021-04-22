'use strict';

var express = require('express');
var router_user = express.Router();


function log_user_agentinfo(req) 
{
	console.log('');
	console.log('remote ip :'+req.connection.remoteAddress);
	console.log('user-agent:'+req.headers['user-agent']);
	console.log('');
	console.log('session:'+JSON.stringify(req.session));
	console.log('cookie:'+JSON.stringify(req.headers.cookie));
	console.log('');
}

// -------- USER BEGIN ---------

router_user.get('/logout', function(req, res) {
	//destroy remember me cookie
	console.log('get user: '+req.url);
	res.json({code:'RESPONSE_SUCCESS', user:null});
});

router_user.post('/logout', function(req, res) {
	//destroy remember me cookie
	console.log('get user: '+req.url);
	res.json({code:'RESPONSE_SUCCESS', user:null});
});

//get user of myself or get user with uid.
router_user.get('/user', function (req, res) {
	console.log('get user: '+req.url);
	res.json({code:'RESPONSE_ERROR', error:'[not_login]'});
});


//with other user id, to get simple infor.
router_user.get('/user/*', function (req, res) {
	console.log('get user: '+req.url);
	res.json({code:'RESPONSE_ERROR', type:req.body.type, error:'[not_support]'});
	res.end();
});

//User JSON : LOGIN/REGISTER/PROFILE return JSON
router_user.post('/user', function (req, res) {

	console.log('post here: '+req.url + ' post:'+JSON.stringify(req.body));

	res.json({code:'RESPONSE_ERROR', type:req.body.type, error:'[not_support]'});
	res.end();
});


// -------- USER END ---------

module.exports = router_user;



