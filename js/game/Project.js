"use strict";

/**
 * @author Fabien Steines
 * @constructor
 */
function Project() {
    this.filesystem = new FileSystemHandler();
}


Project.prototype.create = function(rootPath,projectName,projectTitle,author,devCompany) {

    if (this.filesystem.createFolder(this.filesystem.concat(rootPath,projectName),false)) {

        var projectJSON = {
            title: projectTitle,
            author: author,
            company: devCompany
        };

        this.filesystem.writeJSON(this.filesystem.concat(rootPath,
            this.filesystem.concat(projectName,"project.json")),projectJSON);

    }

};

Project.prototype.load = function() {

};