"use strict";
const {dialog} = require('electron').remote;
const remote = require('electron').remote;
var windowManager = remote.require('../js/npm/electron-window-manager');

var jsonProjectManager = windowManager.sharedData.fetch("projectManager");
var projectManager = ProjectManager.getInstance(jsonProjectManager);

/**
 *
 */
function createButtonClicked() {

    var rootPath = document.getElementById("projectRootPath").value;
    var projectName = document.getElementById("projectFolderName").value;
    var projectTitle = document.getElementById("projectTitle").value;
    var author = document.getElementById("author").value;
    var company = document.getElementById("companyName").value;

    if (projectManager.createProject(rootPath,projectName,projectTitle,author,company)) {

        dialog.showMessageBox({
                               type:"info",
                               buttons:["Ok"],
                               message:"Project created successfully",
                               title:"Success"
                              });

        windowManager.bridge.emit("activeProjectChanged",projectManager.getProject());
        windowManager.getCurrent().close();
    } else {
        dialog.showErrorBox("Create Project Error", "Error during project creation: " + projectName);
    }
}

/**
 *
 */
function cancelButtonClicked() {
    windowManager.getCurrent().close();
}

/**
 *
 */
function lookForProjectRootClicked() {
    var projectRootPath = document.getElementById("projectRootPath");
    var folder = dialog.showOpenDialog({title:"Select Project Root",
        defaultPath:projectRootPath.value, properties: ['openDirectory']});

    if (folder != null && folder.length >= 0) {
        projectRootPath.value = folder[0];
        projectManager.setRootFolder(folder[0]);
        windowManager.bridge.emit("projectManagerChanged",projectManager);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    var projectRootPath = document.getElementById("projectRootPath");
    projectRootPath.value = projectManager.getRootFolder();
});