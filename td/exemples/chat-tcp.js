var net = require('net');

var sockets = [];

var server = net.createServer(function(socket) {
	sockets.push(socket);
	
	socket.on("end", function() {
		sockets.splice(sockets.indexOf(socket), 1);
	});

	socket.on("data", function(data) {
			console.log(socket.address().address + ": " + data);
			sockets.forEach(function(s) {
				if (s !== socket) {
					s.write(socket.address().address + ": " + data);
				}
			});
	});
});
server.listen(1337);