"use strict";

const ipc = require('electron').ipcRenderer;
const {dialog} = require('electron').remote;
const remote = require('electron').remote;

function createButtonClicked() {

    var projectManager = ProjectManager.getInstance();

    var rootPath;
    var projectName;
    var projectTitle;
    var author;
    var company;

    projectManager.createProject(rootPath,projectName,projectTitle,author,company);

}

function cancelButtonClicked() {
    ipc.send("closeProjectWindow");
}

function lookForProjectRootClicked() {
//    ipc.send("newProjectWindowOpenFolderDialog");
    console.log(dialog.showOpenDialog({properties: ['openDirectory']}));
}

document.addEventListener("DOMContentLoaded", function(event) {

    var projectRootPath = document.getElementById("projectRootPath");
    var projectManager = remote.getGlobal('sharedObject').projectManager;
    projectRootPath.value = projectManager.getRootFolder();

});
