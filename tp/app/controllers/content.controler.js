var fs = require('fs');
var path = require('path');
var utils = require('../utils/utils')

var contentModel = require("../models/content.model");

class contentController{

    static list(){
        contentModel.readAll();
    }

    static create(content){
        contentModel.create(content);
    }

    static read(request, response){
        contentModel.read(request.contentId, function(err, data) {
            if (err) {
                return new Error("Problème lecture")
            } else {
                return response.send(data);
            }
        });
    }
}

module.exports = contentController;