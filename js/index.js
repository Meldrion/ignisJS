"use strict";

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const {ipcMain} = require('electron');

global.sharedObject = {projectManager : null};


// Report crashes to our server.
//electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var newProjectWindow = null;
var openProjectWindow = null;
var importManagerWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd   Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

    // Create the browser window and disable integration with node
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon:"assets/calci-64x64.png",
        nodeIntegration: false
    });


    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/../index.html');


    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.

    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // New Project Window
    ipcMain.on("openNewProjectWindow", function () {

        newProjectWindow = new BrowserWindow({
            modal: true,
            parent: mainWindow,
            width: 480,
            height: 650,
            nodeIntegration: false,
            title: "New Project",
            resizable: false,
            skipTaskbar: true,
            show: false,
            center: false
        });

        // No Menubar for this window
        newProjectWindow.setMenu(null);

        // HTML File used by the window
        newProjectWindow.loadURL('file://' + __dirname + '/../view/NewProjectView.html');

        // The on close Event
        newProjectWindow.on('closed', function () {
            newProjectWindow = null;
        });


        // Wait until the page is rendered before showing the window
        newProjectWindow.once('ready-to-show', function () {
            newProjectWindow.show();
        });

    });

    ipcMain.on("closeProjectWindow", function () {
        newProjectWindow.close();
    });


    ipcMain.on("openOpenProjectWindow",function() {
        openProjectWindow = new BrowserWindow({
            modal: true,
            parent: mainWindow,
            width: 450,
            height: 400,
            nodeIntegration: false,
            title: "Open Project",
            resizable: false,
            skipTaskbar: true,
            show: false,
            center: false
        });

        // No Menubar for this window
        openProjectWindow.setMenu(null);

        // HTML File used by the window
        openProjectWindow.loadURL('file://' + __dirname + '/../view/LoadProjectView.html');

        // The on close Event
        openProjectWindow.on('closed', function () {
            openProjectWindow = null;
        });


        openProjectWindow.openDevTools();
        // Wait until the page is rendered before showing the window
        openProjectWindow.once('ready-to-show', function () {
            openProjectWindow.show();
        });
    });


    ipcMain.on("closeOpenProjectWindow",function() {
        openProjectWindow.close();
    });


    ipcMain.on("openImportManagerWindow",function() {
        importManagerWindow = new BrowserWindow({
            modal: true,
            parent: mainWindow,
            width: 800,
            height: 500,//750,
            nodeIntegration: false,
            title: "Import Manager",
            resizable: false,
            skipTaskbar: true,
            show: false,
            center: false
        });

        // No Menubar for this window
        importManagerWindow.setMenu(null);
        importManagerWindow.openDevTools();

        // HTML File used by the window
        importManagerWindow.loadURL('file://' + __dirname + '/../view/ImportManagerView.html');

        // The on close Event
        importManagerWindow.on('closed', function () {
            newProjectWindow = null;
        });

        // Wait until the page is rendered before showing the window
        importManagerWindow.once('ready-to-show', function () {
            importManagerWindow.show();
        });
    });

});