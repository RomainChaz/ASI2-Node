var express = require("express");
var http = require("http");
var path = require("path");
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);


var defaultRoute = require("./app/routes/default.route.js");
var presentationRoute = require("./app/routes/presentation.route.js");
var getPresentations = require("./app/routes/getPresentation.mod.js");
var app = express();

// init server
var server = http.createServer(app);
app.use(defaultRoute);
app.use(presentationRoute);

app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
server.listen(CONFIG.port);

listPres = [];
contentLoaded = 0;
set(listPres, contentLoaded);

getPresentations(function(err, data) {
	var listPres = {};
	if (err) {
		// handle it !!
	} else {
		var cpt=1;
		listPres = data;	
		contentLoaded = 1;
		set(listPres, contentLoaded);
	}
});

function set(listPres, contentLoaded){
	app.set('listPres', listPres);
	app.set('contentLoaded', contentLoaded);
}