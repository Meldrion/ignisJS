
const ipc = require('electron').ipcRenderer;
const {dialog} = require('electron').remote;


function createButtonClicked() {

}

function cancelButtonClicked() {
    ipc.send("closeProjectWindow");
}

function lookForProjectRootClicked() {
//    ipc.send("newProjectWindowOpenFolderDialog");
    console.log(dialog.showOpenDialog({properties: ['openDirectory']}));
}
