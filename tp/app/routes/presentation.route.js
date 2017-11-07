var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
module.exports = router;
var getPresentationsContent = require("./getPresentationContent.mod.js");

var CONFIG = JSON.parse(process.env.CONFIG);
var listPres = process.env.listPres;
var presentationPath = CONFIG.presentationDirectory;

router.route("/loadPres")
.get(function(request, response){
	listPres=request.app.get('listPres');
	contentLoaded=request.app.get('contentLoaded');
	if(contentLoaded != 0){
		getPresentationsContent(listPres, function(err, data) {
			if (err) {
				// handle it !!
			} else {
				return response.send(data);
			}
		});
	}else{
		return response.send("Content loading...");
	}
	
});

router.route("/savePres")
.all(function(request, response){
	return response.send("Saving Presentation");
});