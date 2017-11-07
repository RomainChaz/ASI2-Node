'use strict';

var net = require("net");

var port = Number(process.argv[2]);

(function () {
	// test1();
	test2();
})();

function test1() {
	var server = net.createServer();

	server.on("connection", function(socket) {
		socket.write(getFormatedDate() + "\n");
		socket.end();
	});

	server.listen(port);
}

function test2() {
	var server = net.createServer(function(socket) {
		socket.end(getFormatedDate() + "\n");
	}).listen(port);
}

function getFormatedDate() {
	var date = new Date();

	var dateString = formatNumberXDigit(date.getFullYear(), 4) + "-"
			+ formatNumberXDigit(date.getMonth()+1, 2) + "-"
			+ formatNumberXDigit(date.getDate(), 2) + " "
			+ formatNumberXDigit(date.getHours(), 2) + ":"
			+ formatNumberXDigit(date.getMinutes(), 2);

	return dateString;
}

function formatNumberXDigit(number, digit) {
	var ret = "";
	while (number.toString().length < digit && ret.length < digit-1) {
		ret += "0";
	}
	ret += number.toString();

	return ret;
}