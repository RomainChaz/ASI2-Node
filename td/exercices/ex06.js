var filteredLs = require("./ex06_mod.js");

var dirPath = process.argv[2];
var extFile = process.argv[3];

filteredLs(dirPath, extFile, function(err, data) {
	if (err) {
		// handle it !!
	} else {
		data.forEach(function(fileName) {
			console.log(fileName);
		});
	}
});
