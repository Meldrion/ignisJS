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

ProjectManager.prototype.getProject = function() {
    return this.currentProject;
};

ProjectManager.prototype.createProject = function(rootPath,projectName,projectTitle,devName,devCompany) {
    var project = new Project();
    var worked = project.create(rootPath,projectName,projectTitle,devName,devCompany);
    this.setProject(project);
    return worked;
};

ProjectManager.prototype.deleteProject = function(rootPath,projectName) {
    var path = this.filesystem.toOSStylePath(this.filesystem.concat(rootPath,projectName));
    this.filesystem.deleteFolder(path);
};

ProjectManager.prototype.loadProject = function(path) {
    var project = new Project();
    project.load();
    this.setProject(project);
    return project;
};

ProjectManager.prototype.listAllProjectsInFolder = function(folder) {
    var projectList = [

    ];

    var folders = this.filesystem.readFolderContent(folder);
    for (var i=0;i<folders.length;i++) {
        if (this.isValidProject(folder)) {
            projectList.push({folderName: folders[i] , projectTitle: "1234566"});
        }
    }

    return projectList;
};

ProjectManager.prototype.isValidProject = function(path) {
    return this.filesystem.isFolder(path);
};

ProjectManager.instance = null;

ProjectManager.getInstance = function(otherInstance) {
    if (ProjectManager.instance == null ) {
        ProjectManager.instance = new ProjectManager();
        ProjectManager.instance.syncData(otherInstance);
    }

    return ProjectManager.instance;
};

ProjectManager.prototype.syncData = function(otherInstance) {
    if (otherInstance !== undefined && otherInstance != null) {
        ProjectManager.instance.currentProject = otherInstance.currentProject;
        ProjectManager.instance.rootFolder = otherInstance.rootFolder;
    }
};

ProjectManager.prototype.init = function() {

    this.rootFolder = this.filesystem.toOSStylePath(this.filesystem.concat(this.filesystem.getUserHomeDir(),"ignis"));

    // Hidden Folder for config files
    this.filesystem.createFolder(
        this.filesystem.toOSStylePath(this.filesystem.concat(this.filesystem.getUserHomeDir(),".ignis"),true));

    // Project Folder
    this.filesystem.createFolder(this.rootFolder,true);
};


ProjectManager.prototype.getRootFolder = function() {
    return this.rootFolder;
};

ProjectManager.prototype.setRootFolder = function(rootPath) {
    this.rootFolder = rootPath;
};