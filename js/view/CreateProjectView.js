"use strict";

const ipc = require('electron').ipcRenderer;
const {dialog} = require('electron').remote;
const remote = require('electron').remote;

function createButtonClicked() {

    var projectManager = ProjectManager.getInstance();

    var rootPath = document.getElementById("projectRootPath").value;
    var projectName = document.getElementById("projectFolderName").value;
    var projectTitle = document.getElementById("projectTitle").value;
    var author = document.getElementById("author").value;
    var company = document.getElementById("companyName").value;

    if (projectManager.createProject(rootPath,projectName,projectTitle,author,company)) {
        ipc.send("closeProjectWindow");
    } else {
        alert("Error during project creation: " + projectName);
    }
}

function cancelButtonClicked() {
    ipc.send("closeProjectWindow");
}

function lookForProjectRootClicked() {
    var projectRootPath = document.getElementById("projectRootPath");
    var folder = dialog.showOpenDialog({title:"Select Project Root",
        defaultPath:projectRootPath.value, properties: ['openDirectory']});

    if (folder != null) {
        projectRootPath.value = folder;
    }
}

document.addEventListener("DOMContentLoaded", function(event) {

    var projectRootPath = document.getElementById("projectRootPath");
    var jsonProjectManager = remote.getGlobal('sharedObject').projectManager;
    var projectManager = ProjectManager.getInstance(jsonProjectManager);

    projectRootPath.value = projectManager.getRootFolder();

});