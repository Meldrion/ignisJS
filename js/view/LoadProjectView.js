
"use strict";
const {dialog} = require('electron').remote;
const remote = require('electron').remote;
var windowManager = remote.require('../js/npm/electron-window-manager');
var pM = windowManager.sharedData.fetch("projectManager");
var projectManager = ProjectManager.getInstance(pM);

function loadButtonClicked() {

}

function cancelButtonClicked() {
    windowManager.getCurrent().close();
}


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

    $("#projectRootPath").val(projectManager.getRootFolder());

    $('#projects').bootstrapTable({
        data: projectManager.listAllProjectsInFolder(projectManager.getRootFolder()),
        striped: true
    });
});


