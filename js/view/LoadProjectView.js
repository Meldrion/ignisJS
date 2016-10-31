
"use strict";
const {dialog} = require('electron').remote;
const remote = require('electron').remote;
var windowManager = remote.require('../js/npm/electron-window-manager');


function loadButtonClicked() {

}

function cancelButtonClicked() {
    windowManager.getCurrent().close();
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

    var pM = windowManager.sharedData.fetch("projectManager");

    var projectManager = ProjectManager.getInstance(pM);

    $("#projectRootPath").val(projectManager.getRootFolder());

    $('#projects').bootstrapTable({
        data: projectManager.listAllProjectsInFolder(projectManager.getRootFolder()),
        striped: true
    });
});


