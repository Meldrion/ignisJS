
const ipc = require('electron').ipcRenderer;


function createButtonClicked() {

}

function cancelButtonClicked() {
    ipc.send("closeProjectWindow");
}
