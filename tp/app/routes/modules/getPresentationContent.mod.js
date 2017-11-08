var fs = require("fs");
var path = require("path");

var CONFIG = JSON.parse(process.env.CONFIG);
var presentationPath = CONFIG.presentationDirectory;

module.exports = function(data, callback){
	var listPres = {};
	var cpt=1;
	data.forEach(function (fileName) {		
		var content = fs.readFileSync(path.join(presentationPath, fileName));
		var obj = JSON.parse(content);
		var key = 'pres.' + cpt + '.' + obj.id;
	  	listPres[key] = obj;
	  	cpt++;
	});
	if(callback)
		return callback(null, JSON.stringify(listPres));
}