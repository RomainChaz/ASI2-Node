function foo (ms, go) {
	setTimeout(function() {
		console.log("bar");
	}, ms);
}

foo(1000, function() {
	console.log("foo");
});