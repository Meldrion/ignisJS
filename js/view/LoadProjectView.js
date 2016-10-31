
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


function deleteButtonClicked() {

    var projectsTable = $('#projects');
    var selections = projectsTable.bootstrapTable('getSelections');

    if (selections.length > 0) {
        var project = selections[0].folderName;

        var options = { title:"Are you sure ?",type:"warning",
                        message:"Are you sure that you want to delete " + project  + " ?",
                        buttons: ["Yes","No"] };

        if (dialog.showMessageBox(windowManager.getCurrent().object, options) == 0) {
            projectManager.deleteProject(document.getElementById("projectRootPath").value,project);
        }

        var ids = $.map(projectsTable.bootstrapTable('getSelections'), function (row) {
            return row.folderName;
        });

        projectsTable.bootstrapTable('remove', {
            field: 'folderName',
            values: ids
        });

    }

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

function buildTable() {
    $('#projects').bootstrapTable({
        data: projectManager.listAllProjectsInFolder(projectManager.getRootFolder()),
        striped: true
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    $("#projectRootPath").val(projectManager.getRootFolder());
    buildTable();
});


