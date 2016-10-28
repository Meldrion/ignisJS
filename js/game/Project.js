"use strict";

/**
 * @author Fabien Steines
 * @constructor
 */
function Project() {
    this.filesystem = new FileSystemHandler();
    this.mapTree = new MapTree();

    this.assetStructure = null;
}

/**
 *
 * @param rootPath
 * @param projectName
 * @param projectTitle
 * @param author
 * @param devCompany
 */
Project.prototype.create = function(rootPath,projectName,projectTitle,author,devCompany) {

    var projRoot = this.filesystem.toOSStylePath(this.filesystem.concat(rootPath,projectName));

    if (this.filesystem.createFolder(projRoot,false)) {

        this.assetStructure = new AssetStructure(projRoot);

        // Create the Project JSON File
        var projectJSON = {
            title: projectTitle,
            author: author,
            company: devCompany
        };

        // Write the Project JSON to Disk
        this.filesystem.writeJSON(this.filesystem.concat(rootPath,
            this.filesystem.concat(projectName,"project.json")),projectJSON);

        // Create the Base Structure of the Project
        this.filesystem.createFolder(this.assetStructure.asset());
        var assetNames = AssetStructure.getAssetNames();
        for (var i = 0;i<assetNames.length;i++) {
            this.filesystem.createFolder(this.assetStructure.getPath(assetNames[i]));
        }
    }

};

/**
 *
 */
Project.prototype.load = function() {

};


/**
 *
 */
Project.prototype.save = function() {

};