'use strict';

var express = require('express');
var router = express.Router();

router.get('/samples', function(req, res) {
});

module.exports = router;

//redis
var redis = require('redis');
var client = redis.createClient();

//session
var session = require('client-sessions');

client.on('connect', function() {
    console.log('connected');
});

//session features
router.use(session({
  cookieName: 'session',
  secret: 'secretstring',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//register
router.post('/r.html',function (req,res){
  client.exists(req.query.email, function(err, reply) {
    if (reply === 1) {
      res.send("Email already taken!");
    } else {
      client.hmset(req.query.email, {
        'firstname': req.query.firstname,
        'lastname': req.query.lastname,
        'email': req.query.email,
        'password': req.query.password,
        'avatar': null
      });
      var data = JSON.stringify({"firstname": req.query.firstname, "lastname": req.query.lastname});
      res.send(data);
    }
  });
});

//login
router.get('/l.html',function (req,res){
  console.log(req.query.email + " | " + req.query.password);
  client.exists(req.query.email, function(err, reply) {
    if (reply === 1) {
      client.hget(req.query.email, 'password', function (err, obj) {
        console.log('obj='+obj);
        if (obj.toString() != req.query.password){
          res.send(JSON.stringify({"bool": false}));
          req.session.reset();
        } else {
          req.session.user = req.query.email;
          res.send(JSON.stringify({"user": req.session.user, "bool": true}));
        }
      });
    } else {
      req.session.reset();
      res.send(JSON.stringify({"bool": false}));
    }
  });
});

//google login
router.get('/gl.html',function (req,res){
  console.log(req.query.email + " | " + req.query.fullname + " | " );
  client.exists(req.query.email, function(err, reply) {
    if (reply === 1) {
        req.session.user = req.query.email;
        res.send(JSON.stringify({"user": req.session.user, "bool": true}));
    } else {
      client.hmset(req.query.email, {
        'firstname': req.query.fullname,
        'email': req.query.email,
        'avatar': null
      });
      var data = JSON.stringify({"firstname": req.query.firstname, "lastname": req.query.lastname});
      req.session.user = req.query.email;
      conso
      res.send(data);
    }
  });
});

//profile
router.get('/p.html',function (req,res){
  if (req.session && req.session.user) {
    client.hgetall(req.session.user, function (err, obj) {
      res.send(obj);
    });
  } else {
    res.send(JSON.stringify({"session": false}));
  }
});

//logout
router.get('/lo.html', function(req, res) {
  req.session.reset();
  res.send(JSON.stringify({"bool": true}));
});

//check if logged in
router.get('/ln.html',function (req,res){
  if (req.session && req.session.user) {
    res.send(JSON.stringify({"bool": true}));
  } else {
    res.send(JSON.stringify({"bool": false}));
  }
});

