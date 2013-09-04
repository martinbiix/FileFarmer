// FileFarmer by scrapbird

// requires
var express = require('express');
var fs = require('fs');
var http = require('http');

var config = JSON.parse(fs.readFileSync('config.json'));
var routes = require('./routes.js');

// create the express server
var app = express();
var server = http.createServer(app);

// set up the express server
app.use(app.router);
routes.attachHandlers(app, config);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + config.public_dir));

// create the channel manager and the redis client for the sockjs server
channels.init();
var redis_cli = redis.createClient(config.redis_port, config.redis_host);

// set up the sockjs server
var sockjs_opts = {sockjs_url: config.sockjs_url};
var sockjs_server = sockjs.createServer(sockjs_opts);
sock.attachHandlers(
	sockjs_server,
	redis_cli,
	db,
	channels
);
sockjs_server.installHandlers(server, {prefix: config.sockjs_prefix});

// start the http server
logger.log('[+] Starting server on ' + config.http_host + ':' + config.http_port);
server.listen(config.http_port, config.http_host);