"use strict";

const ipc = require('electron').ipcRenderer;
const {dialog} = require('electron').remote;
const remote = require('electron').remote;

function loadButtonClicked() {

}

function cancelButtonClicked() {
    ipc.send("closeOpenProjectWindow");
}