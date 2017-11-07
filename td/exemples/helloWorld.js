//////////
console.log("hello world");


//////////
console.log("hello");
setTimeout(function() {
	console.log("world");
}, 1000);


//////////
setTimeout(function() {
	console.log("world");
}, 1000);
console.log("hello");


//////////
setInterval(function() {
	console.log("world");
}, 1000);
console.log("hello");
// NodeJS ne s'arrete pas tant que les callbacks ne sont pas terminés


//////////
var http = require("http");
http.createServer(function(request, response) {
	response.writeHead(200, {"content-type": "text/plain"});
	response.end("hello world\n");
}).listen(9999);
