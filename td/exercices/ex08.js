'use strict'

var http = require("http");

function call(i) {
	var addr = process.argv[i];

	http.get(addr, function(res) {
		var response = "";
		res.on("data", function(data) {
			if (data) {
				response += data
			}
		});
		res.on("end", function() {
			console.log(response);
			if (i < process.argv.length -1) {
				call(i + 1);
			}
		});
	});
}

function main() {
	call(2);
}
main();