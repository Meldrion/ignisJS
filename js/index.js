"use strict";

const electron = require('electron');
const application = electron.app;
const {Menu,MenuItem} = require('electron');
//const menu = electron.menu;
const windowManager = require('./npm/electron-window-manager');
// Dynamic Menu for right click


// Quit when all windows are closed.
application.on('window-all-closed', function () {

    // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd   Q
    if (process.platform != 'darwin') {
        application.quit();
    }

});

application.on("before-quit",function (event) {
    //console.log(event);
});

application.on('ready', function(){
    windowManager.init();

    windowManager.templates.set('main', {
        width: 800,
        height: 600,
        resizable: true,
        showDevTools: false,
        title: 'Ignis',
        icon:"assets/calci-64x64.png"
    });

    var main = windowManager.open("mainWindow","Ignis",windowManager.convert("view/MainView.html"),"main");

    const mainMenu = new Menu();

    const fileSubMenu = new Menu();
    fileSubMenu.append(new MenuItem({label: 'New Project'}));
    fileSubMenu.append(new MenuItem({label: 'Load Project'}));
    fileSubMenu.append(new MenuItem({label: 'Save'}));
    fileSubMenu.append(new MenuItem({label: 'Close Project'}));
    fileSubMenu.append(new MenuItem({type: 'separator'}));
    fileSubMenu.append(new MenuItem({label: 'Exit',click: function() {application.quit();}}));

    const fileMenu = new MenuItem({label: "File",submenu : fileSubMenu});

    mainMenu.append(fileMenu);
    mainMenu.append(new MenuItem({label: 'Edit'}));

    main.object.setMenu(mainMenu);


    // Sub Windows

    windowManager.templates.set("newProjectWindow", {
        width: 480,
        height: 650,
        resizable: false,
        showDevTools: false,
        menu: null,
        modal: true,
        minimizable: false,
        parent: main.object,
        icon:"assets/calci-64x64.png"

    });

    windowManager.templates.set("loadProjectWindow", {
        width: 450,
        height: 510,
        resizable: false,
        showDevTools: false,
        menu: null,
        modal: true,
        minimizable: false,
        parent: main.object,
        icon:"assets/calci-64x64.png"
    });

    windowManager.templates.set("importManagerWindow", {
        width: 800,
        height: 480,
        resizable: false,
        showDevTools: false,
        menu: null,
        modal: true,
        minimizable: false,
        parent: main.object,
        icon:"assets/calci-64x64.png"
    });

});