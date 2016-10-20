function ProjectManager() {

    this.currentProject = null;
}

ProjectManager.prototype.setProject = function(project) {
    this.currentProject = project;
};

ProjectManager.prototype.createProject = function(rootPath,projectName,projectTitle,devName,devCompany) {
    var project = new Project();
    project.create(rootPath,projectName,projectTitle,devName,devCompany);
    this.setProject(project);
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