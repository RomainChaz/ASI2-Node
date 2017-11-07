'use strict';

var http = require("http");
var url = require("url");
var fs = require("fs");
var CONFIG = require("./config.json");
var path = require("path");

var server = http.createServer(function(request, response) {
	var filePath = url.parse(request.url).pathname;
	if (filePath == "/") {
		filePath = "/index.html";
	}

	filePath = path.join(CONFIG.publicDir, filePath);

	fs.access(filePath, fs.R_OK, function(err) {
		if (err) {
			console.error(request.url + " - ERROR 404: FILE NOT FOUND !");
			response.writeHead(404);
			var errorPath = path.join(CONFIG.publicDir, "/img/404.png");
			fs.readFile(errorPath, function(err, data) {
				handleReadFile(err, data, "/img/404.png", response);
			});
		} else {
			fs.readFile(filePath, function(err, data) {
				response.writeHead(200);
				handleReadFile(err, data, filePath, response);
			});
		}
	});
});

server.listen(CONFIG.port, function(err) {
	if (err) {
		console.error("ERROR ON STARTUP...");
	} else {
		console.log("Server listening on port " + CONFIG.port);
	}
});

function handleReadFile(err, data, path, httpResponse) {
	if (err) {
		console.error(path + " - ERROR 500");
		httpResponse.writeHead(500);
		httpResponse.end(path + " - ERROR 500");
	} else {
		console.log(path + " - OK");
		httpResponse.end(data);
	}
}