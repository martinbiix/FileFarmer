/**
	Sets up handlers for all the different routes that may be requested by clients
		app		- the express app
		config	- object containing the configuration set in config.json
*/
function attachHandlers(app, config) {
	// index
	app.get('/', function (request, response) {
		console.log('[-] Received a request for ' + request.url);
		response.render('home.jade');
	});
}

exports.attachHandlers = attachHandlers;
