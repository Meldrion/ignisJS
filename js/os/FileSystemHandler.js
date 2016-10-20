var fs = require('fs');
var jsonfile = require('jsonfile');
var osenv = require('osenv');

function FileSystemHandler() {

}

FileSystemHandler.prototype.concat = function(f1,f2) {
    return f1 + "/" + f2;
};

FileSystemHandler.prototype.getUserHomeDir = function() {
    return osenv.home();
};

FileSystemHandler.prototype.writeJSON = function(filePath,jsonContent) {

    jsonfile.writeFile(filePath, jsonContent,{spaces : 2}, function (err) {

        if (err != null) {
            console.error(err);
            return false;
        } else {
            return true;
        }

    });

    return true;
};

FileSystemHandler.prototype.readJSON = function(filePath) {

    try {
        return jsonfile.readFileSync(filePath);
    } catch (e) {
        console.error(e);
        return null;
    }
};

FileSystemHandler.prototype.createFolder = function(folder,ignoreFolderAlreadyExistError) {
    try {
        fs.mkdirSync(folder);
        return true;
    } catch(e) {

        if (!ignoreFolderAlreadyExistError) {
            console.error("Error while trying to create folder " + folder + " " + e);
            return false;
        } else {
            return true;
        }
    }
};