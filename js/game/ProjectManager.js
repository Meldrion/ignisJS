"use strict";


/**
 * @author Fabien Steines
 * @constructor
 */
function ProjectManager() {

    this.currentProject = null;
    this.filesystem = new FileSystemHandler();
    this.rootFolder = "";
}

ProjectManager.prototype.setProject = function(project) {
    this.currentProject = project;
};

ProjectManager.prototype.createProject = function(rootPath,projectName,projectTitle,devName,devCompany) {
    var project = new Project();
    project.create(rootPath,projectName,projectTitle,devName,devCompany);
    this.setProject(project);
    return project;
};

ProjectManager.prototype.loadProject = function(path) {
    var project = new Project();
    project.load();
    this.setProject(project);
    return project;
};

ProjectManager.prototype.listAllProjectsInFolder = function(folder) {

};

ProjectManager.instance = null;

ProjectManager.getInstance = function() {
    if (ProjectManager.instance == null ) {
        ProjectManager.instance = new ProjectManager();
    }

    return ProjectManager.instance;
};

ProjectManager.prototype.init = function() {

    this.rootFolder = this.filesystem.concat(this.filesystem.getUserHomeDir(),"ignis");

    // Hidden Folder for config files
    this.filesystem.createFolder(this.filesystem.concat(this.filesystem.getUserHomeDir(),".ignis"),true);
    // Project Folder
    this.filesystem.createFolder(this.rootFolder,true);
};


ProjectManager.prototype.getRootFolder = function() {

    console.log(this.rootFolder);
    return this.rootFolder;
};