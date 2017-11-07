var fs = require("fs");
var path = require("path");

var dirPath = process.argv[2];
var extFile = process.argv[3];

fs.readdir(dirPath, function(err, data) {
	data.forEach(function (fileName) {
		if (path.extname(fileName) === "." + extFile) {
			console.log(fileName);
		}
	});
});
