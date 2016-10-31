"use strict";
const {dialog} = require('electron').remote;
const remote = require('electron').remote;
var windowManager = remote.require('../js/npm/electron-window-manager');

/**
 *
 */
function createButtonClicked() {

    var projectManager = ProjectManager.getInstance();

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

    if (folder != null) {
        projectRootPath.value = folder;
    }
}

document.addEventListener("DOMContentLoaded", function(event) {

    var projectRootPath = document.getElementById("projectRootPath");

    var jsonProjectManager = windowManager.sharedData.fetch("projectManager");
    var projectManager = ProjectManager.getInstance(jsonProjectManager);

    projectRootPath.value = projectManager.getRootFolder();

});