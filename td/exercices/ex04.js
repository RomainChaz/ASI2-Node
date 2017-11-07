var fs = require("fs");

fs.readFile(process.argv[2], function(err, data) {
	console.log(data.toString().split(/\r\n|\r|\n/).length - 1);
});
