var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
module.exports = router;



var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(bodyParser.json()); // for parsing application/json

var getPresentationsContent = require("./modules/getPresentationContent.mod.js");
var addPresentation = require("./modules/addPresentation.mod.js");

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
.post(function(req, response){
	var obj = req.body;
	var id = obj.id;
	var fileName = id +".pres.json";

	addPresentation(fileName,obj, function(err,data){
		console.log('Data: ' + data);
		if(data === 1){
			
			return response.json("Presentation added");
		}

	});
	
	
});