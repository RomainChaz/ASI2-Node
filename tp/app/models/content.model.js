var fs = require('fs');
var path = require('path');
var utils = require('../utils/utils')
var CONFIG = require("../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);


class ContentModel{
    constructor() {
        this.type = "";
        this.id = 0;
        this.src = "";
        this.fileName = "";
        this.title = "";

        var data;
        this.getData = () => data; 
        this.setData = (newData) =>  data = newData; 
    }
    

    fillField(dataJson){
        this.type = dataJson.type;
        this.id = dataJson.id;
        this.src = dataJson.src;
        this.fileName = dataJson.fileName;
        this.title = dataJson.title;
        this.setData(null);
    }
        
    static create(content, callback){
        if(!!content && !content.id){
            return callback(new Error("ID non valide"));
        }
        // On créé le fichier contenant l'image dans le cas d'un contenu de type image
        if(content.getData() !== null){
            //Création des Meta puis Data
            fs.writeFile(utils.getMetaFilePath(content.id),JSON.stringify(content), function(err){
                if(err) callback(err);
                console.log("file meta saved");
                //callback(null, content);

                fs.writeFile(utils.getDataFilePath(content.fileName),content.getData(), function(err){
                    if(err)  callback(err);
                    console.log("file data saved");
                    callback(null, content);
                }); 
            });
        }
        else{
            fs.writeFile(utils.getMetaFilePath(content.id),content, function(err){
                if(err) callback(err);
                console.log("file meta saved");
                callback(null, content);
            });
        }        
    }

    static read(id, callback){
        fs.readFile(utils.getMetaFilePath(id), function(err, data){
            if(err) return callback(err);
            var contentModel = new ContentModel();
            contentModel.fillField(JSON.parse(data));
            callback(null, contentModel);
        });
        
    }

    static readAll(callback){
        
    }

    static update(content, callback){
        if(!!content && !content.id){
            return callback(new Error("ID non valide"));
        }
        // On vérifie que le fichier existe
        ContentModel.read(content.id, function(err, success){
            if(err) return callback(err);
            console.log(content)
            ContentModel.create(content,function(err, success){
                if(err) return callback(err);
                callback(null, content);
            });
        });                
    }

    static delete(id, callback){
        if(id !== null)
        {
            fs.readdir(CONFIG.contentDirectory, function (err, files) {
                if (err) {
                    console.log(err.message);
                    callback(err);
                    return;
                }
                files.forEach(function (file) {
                    if(file === (id+path.extname(file)) || file === (id+".meta.json"))
                    {
                        fs.unlink(CONFIG.contentDirectory + "/" + file,function(err){
                            if(err){
                                console.log(err.message);
                                callback(err);
                            }
                            else{
                                console.log("fichier" + file + " supprimé");
                                callback(null,"ok");
                            }
                        });
                    }
                });
            });
        }    
    }
}

module.exports = ContentModel;