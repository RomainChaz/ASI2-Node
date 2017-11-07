// console.log(process.argv)
function test() {
	var sum = 0;

	for (var i in process.argv) {
		var elm = process.argv[i]
		
		if (!Number.isNaN(Number(elm))) {
			sum += Number(elm);
		}
	}
	console.log(sum);
}

function corr() {
	var result = 0
    
    for (var i = 2; i < process.argv.length; i++)
      result += Number(process.argv[i])
    
    console.log(result)
}

test();