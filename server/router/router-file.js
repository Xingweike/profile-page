'use strict';

var express = require('express');
var request = require('request');
var router_file = express.Router();
var formidable = require('formidable');
var fs = require('fs');

//redis
var redis = require('redis');
var client = redis.createClient();

//session
var session = require('client-sessions');

client.on('connect', function() {
    console.log('connected');
});

const IMAGE_STORE_PATH = '/Users/tomliu/Desktop/personal\ projects/livepage2/static/images/';

//session features
router_file.use(session({
  cookieName: 'session',
  secret: 'secretstring',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

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

function upload(res, file)
{
	var filepath = ''+fid;

	var newFileName = encodeURIComponent(file.name);
	res.setHeader('Content-Disposition', 'attachment;filename*=UTF-8\'\''+newFileName);            
	res.setHeader('Content-type', file.type);
	res.setHeader('Content-Length', file.size);

	try {
		var filestream = fs.createReadStream(filepath);
		filestream.on('error', (err)=>{
			console.log('mxfile: got error:', err);
		});
		filestream.pipe(res);			
	}
	catch (err) {
		console.log('mxfile: stream file failed:', err);
		res.end();
	}
}

// -------- USER BEGIN ---------

router_file.get('/download', function(req, res) {
	//destroy remember me cookie
	console.log('get user: '+req.url);
	res.json({code:'RESPONSE_SUCCESS', user:null});
});

router_file.get('/avatar/*', function(req, res) {
	//destroy remember me cookie
	console.log('get avatar: '+req.url);


  var url_parts = url.parse(req_url, true);
  var path = url_parts.pathname.split('/');
  for (var i=path.length-1; i>= 0; i--) {
    if (path[i].length==0) {
    path.splice(i, 1);
    }
  }

  var query = url_parts.query;

  
	var q = {path:path, query:query};
	var fid = q[1];
	console.log('fid: '+fid);

	});


//avatar upload

router_file.post('/upload', function (req, res) {

  console.log('post here: '+req.url); // + ' post:'+JSON.stringify(req));

  if (req.session && req.session.user) {
  	var uid = req.session.user;
  } else {
  	console.log("not logged in")
    return;
  }

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  form.hash = 'sha1';

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(ufield, ufile) {
    console.log('router-file: upload file');

    console.log('ufield:'+JSON.stringify(ufield));
    console.log('ufile:'+JSON.stringify(ufile));
    var oldpath = ufile.path;
    var newpath = IMAGE_STORE_PATH + ufile.hash; //change
    console.log('session:'+req.session.user);

	    fs.rename(oldpath, newpath, function (err) {
	      if (err) throw err;
	    	console.log('File uploaded and moved!');
	    	console.log('user: '+uid);
	    	console.log('file: '+ufile.hash);

	    	client.hmset(uid, {
		        'avatar': ufile.hash
		      });
	  	   	client.hmset(ufile.hash, {
		        'JSON': JSON.stringify(ufile)
		      });

	  	   	res.send(JSON.stringify({"user": uid, "bool": true}));

	  	   	res.end();
	     });

  });

  form.on('field', function(key, value) {
  });

  // log any errors that occur
  form.on('error', function(err) {
     console.log('router-file: An error has occured: ' + err);
    res.json({code:'RESPONSE_ERROR', type:req.body.type, error:err});
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function(ufield, ufile) {
     console.log('router-file: file upload end');
  });

  form.parse(req);
});

module.exports = router_file;



