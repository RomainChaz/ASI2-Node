function test1() {
	var http = require("http");

	var addr = process.argv[2];

	http.get(addr, function(res) {
		res.on("data", function(data) {
			console.log(data.toString());
		});
	});
}

function test2() {
	var http = require('http');

	http.get(process.argv[2], function (response) {
		response.setEncoding('utf8');
		response.on('data', console.log);
		response.on('error', console.error);
	});
}

test2();