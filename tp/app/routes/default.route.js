var express = require("express");
var router = express.Router();
module.exports = router;

// TODO : Routing using
router.route("/")
.all(function(request, response){
	return response.send("It works !");
})
