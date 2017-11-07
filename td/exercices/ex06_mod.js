var fs = require("fs");
var path = require("path");

module.exports = function (dirPath, extname, cb) {
	var listFile = [];
	fs.readdir(dirPath, function(err, data) {
		if (err) {
			if (cb) {
				return cb(err);
			}
		}

		for (var i in data) {
			var fileName = data[i];
			if (path.extname(fileName) === "." + extname) {
				listFile.push(fileName);
			}
		}

		// listFile = data.filter(function (file) {
		// 	return path.extname(file) === '.' + extname
		// });
		
		if (cb) {
			return cb(null, listFile);
		}
	});
}
