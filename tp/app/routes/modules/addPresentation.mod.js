var fs = require("fs");
var path = require("path");

var CONFIG = JSON.parse(process.env.CONFIG);
var presentationPath = CONFIG.presentationDirectory;

module.exports = function(fileName, content, callback){
    var isWritten = 0;
	fs.writeFile(path.join(presentationPath, fileName), content, function(err) {
		if(err) {
			return console.log(err);
            if(callback)
                return callback("Error during saving file", isWritten);
		}
        isWritten = 1;
        
		console.log("The file was saved!");
        if(callback)
            return callback(null, isWritten);
    });
}