var fs = require("fs");
var path = require("path");

var CONFIG = JSON.parse(process.env.CONFIG);
var presentationPath = CONFIG.presentationDirectory;

module.exports = function(callback){
	var listFile = [];
	fs.readdir(presentationPath, function(err, data) {
		for (var i in data) {
			var fileName = data[i];
			if (path.extname(fileName) === ".json") {
				listFile.push(fileName);
			}
		}
		if (callback) {
			return callback(null, listFile);
		}
	});
}