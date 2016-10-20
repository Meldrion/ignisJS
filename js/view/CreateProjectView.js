"use strict";

const ipc = require('electron').ipcRenderer;
const {dialog} = require('electron').remote;
const remote = require('electron').remote;

function createButtonClicked() {

    var projectManager = ProjectManager.getInstance();

    var rootPath = document.getElementById("projectRootPath").value;
    var projectName = document.getElementById("projectName").value;;
    var projectTitle;
    var author;
    var company;

    projectManager.createProject(rootPath,projectName,projectTitle,author,company);

}

function cancelButtonClicked() {
    ipc.send("closeProjectWindow");
}

function lookForProjectRootClicked() {
    var projectRootPath = document.getElementById("projectRootPath");
    var folder = dialog.showOpenDialog({title:"Select Project Root",
        defaultPath:projectRootPath.value, properties: ['openDirectory']});
}

document.addEventListener("DOMContentLoaded", function(event) {

    var projectRootPath = document.getElementById("projectRootPath");
    var jsonProjectManager = remote.getGlobal('sharedObject').projectManager;
    var projectManager = ProjectManager.getInstance(jsonProjectManager);

    console.log(projectManager);
    projectRootPath.value = projectManager.getRootFolder();

});
