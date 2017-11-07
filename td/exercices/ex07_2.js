'use strict'

var http = require("http");

(function () {
	// test1();
	// test2();
	test3();
})();



function test1() {

	var addr = process.argv[2];

	http.get(addr, function(res) {
		var response = "";
		res.on("data", function(data) {
			if (data) {
				response += data
			}
		});
		res.on("end", function() {
			console.log(response.toString().length);
			console.log(response);
		});
	});
}

function test2() {
	var addr = process.argv[2];

	http.get(addr, function(res) {
		res.pipe(process.stdout);
	});
}

function test3() {
	var addr = process.argv[2];

	http.get(addr, function(res) {
		res.pipe(new MyStream(function(data) {
			console.log(data.length);
			console.log(data);
		}));
	});
}

function MyStream(callback) {
	var data = "";
	var stream = new require("stream").Writable();

	stream._write = function(chunk, encoding, cb) {
		data += chunk.toString();
		if (cb) {
			cb();
		}
	}

	 stream.on("finish", function() {
	 	if (callback) {
	 		callback(data);
	 	}
	 });

	 return stream;
}