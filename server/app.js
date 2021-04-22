// import express from 'express';
// import http from 'http';

var express = require('express');
var http = require('http');

var formidable = require('formidable');

const url = require('url');  
const querystring = require('querystring');

// init app
let app = express();
app.use(express.static('static'))



//Load Webpack (For Dev purposes)
var webpack = require('webpack');
// import configs from './../webpack.config.js';
var configs = require('./../webpack.config.js');

var middleware = require('webpack-dev-middleware');

for (var i=0; i<configs.length; i++) {
// Step 1: Create & configure a webpack compiler
  var compiler = webpack(configs[i]);

// Step 2: Attach the dev middleware to the compiler & the server
  app.use(middleware(compiler, { noInfo: true, publicPath: configs[i].output.publicPath }));

// Step 3: Attach the hot middleware to the compiler & the server
  app.use(require('webpack-hot-middleware')(compiler));
}
//End Webpack


// setup routers
app.use('/', require('./router.js'));
app.use('/', require('./router/router-user.js'));
app.use('/', require('./router/router-file.js'));

//create http server
let server = http.createServer(app);

//start to listen 3000.
let port = 3000; 
server.listen(port, () => {
    console.log('[INFO] Listening on *: static folder ...' + server.address().port);
});

/**
 * Event listener for HTTP server 'error' event.
 */
server.on('error', function(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }

  // handle specific listen errors with friendly messages
  switch (err.code) {
    case 'EACCES':
      console.error('port:['+port+'] requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('port:['+port+'] is already in use');
      process.exit(1);
      break;
    default:
      throw err;
  }
});







