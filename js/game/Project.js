"use strict";

/**
 * @author Fabien Steines
 * @constructor
 */
function Project() {
    this.filesystem = new FileSystemHandler();
    this.assetStructure = null;
}

Project.prototype.create = function(rootPath,projectName,projectTitle,author,devCompany) {

    var projRoot = this.filesystem.toOSStylePath(this.filesystem.concat(rootPath,projectName));

    if (this.filesystem.createFolder(projRoot,false)) {

        this.assetStructure = new AssetStructure(projRoot);

        var projectJSON = {
            title: projectTitle,
            author: author,
            company: devCompany
        };

        this.filesystem.writeJSON(this.filesystem.concat(rootPath,
            this.filesystem.concat(projectName,"project.json")),projectJSON);
        
        this.filesystem.createFolder(this.assetStructure.asset());
        this.filesystem.createFolder(this.assetStructure.tileset());
        
    }

};

Project.prototype.load = function() {

};