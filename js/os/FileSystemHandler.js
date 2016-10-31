var fs = require('fs');
var jsonfile = require('jsonfile');
var osenv = require('osenv');
var os  = require("os");

function FileSystemHandler() {

}

FileSystemHandler.prototype.concat = function(f1,f2) {
    return f1 + "/" + f2;
};

FileSystemHandler.prototype.getUserHomeDir = function() {
    return osenv.home();
};

FileSystemHandler.prototype.toOSStylePath = function(inputPath) {

    if (os.platform() == "win32") {
        while (inputPath.indexOf("/") != -1) {
            inputPath = inputPath.replace("/","\\");
        }
    } else {
        while (inputPath.indexOf("\\") != -1) {
            inputPath = inputPath.replace("\\","/");
        }
    }

    return inputPath;
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

FileSystemHandler.prototype.deleteFolder = function(path) {

    if (path == null || path == undefined || path == "")
        return;

    if( fs.existsSync(path) ) {

        var folders = fs.readdirSync(path);
        for (var index = 0;index < folders.length;index++) {
            var currentPath = this.toOSStylePath(path + "/" + folders[index]);

            if(fs.lstatSync(currentPath).isDirectory()) { // recurse
                this.deleteFolder(currentPath);
            } else { // delete file
                fs.unlinkSync(currentPath);
            }
        }

        fs.rmdirSync(path);
    }
};

FileSystemHandler.prototype.readFolderContent = function(folder) {
    return fs.readdirSync(folder);
};

FileSystemHandler.prototype.isFolder = function (folderPath) {
    return fs.statSync(folderPath).isDirectory();
};

FileSystemHandler.prototype.isFile = function (filePath) {
    return fs.statSync(filePath).isFile();
};

FileSystemHandler.prototype.doesExist = function (path) {
    return fs.existsSync(path);
};

