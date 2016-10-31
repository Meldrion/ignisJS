"use strict";

/**
 * @author Fabien Steines
 * @constructor
 */
function Project() {
    this.filesystem = new FileSystemHandler();
    this.mapTree = new MapTree();
    this.assetStructure = null;
    this.projectRoot = "";
    this.projectDetails = {};
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

    this.projectRoot = this.filesystem.toOSStylePath(this.filesystem.concat(rootPath,projectName));

    if (this.filesystem.createFolder(this.projectRoot,false)) {

        var allOk = true;
        this.assetStructure = new AssetStructure(this.projectRoot);

        // Create the Project JSON File
        this.projectDetails = {
            title: projectTitle,
            author: author,
            company: devCompany
        };

        // Write the Project JSON to Disk
        allOk &= this.filesystem.writeJSON(this.assetStructure.getProjectJSON(),this.projectDetails);

        // Create the Base Structure of the Project
        allOk &= this.filesystem.createFolder(this.assetStructure.asset());
        var assetNames = AssetStructure.getAssetNames();
        for (var i = 0;i<assetNames.length;i++) {
            allOk &= this.filesystem.createFolder(this.assetStructure.getPath(assetNames[i]));
        }

        return allOk;

    } else {

        return false;
    }

};

/**
 *
 */
Project.prototype.load = function(projectRoot) {
    this.projectRoot = projectRoot;
    this.assetStructure = new AssetStructure(this.projectRoot);
    this.projectDetails = this.filesystem.readJSON(this.assetStructure.getProjectJSON());
};


/**
 *
 */
Project.prototype.save = function() {

};