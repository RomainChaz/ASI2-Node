var express = require("express");
var multer = require("multer");
var router = express.Router();
var fs = require("fs");
var path = require("path");
module.exports = router;

var contentController = require('./../controllers/content.controler.js');
var multerMiddleware = multer({ "dest": "/tmp/" });

/*router.get("/contents", contentController.read);
router.post("/contents", multerMiddleware.single("file"), contentController.create);*/

router.get("/contents/:contentId", contentController.read);

/*router.route("/contents/:contentId")
.get(function(request, response){
    contentController.read(request.contentId, function(err, data) {
        if (err) {
            return new Error("Problème lecture")
        } else {
            return response.send(data);
        }
    });
});*/

router.param('contentId', function(req, res, next, id) {
    req.contentId = id;
    next();
});