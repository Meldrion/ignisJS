"use strict";


const electron = require('electron');
const application = electron.app;
const windowManager = require('./npm/electron-window-manager');

application.on('ready', function(){
    windowManager.init();

    windowManager.templates.set('main', {
        width: 800,
        height: 600,
        resizable: true,
        showDevTools: true,
        title: 'Ignis', // Yeah, even the window title!
        menu: null,
        icon:"assets/calci-64x64.png"
    });

    windowManager.open("mainWindow","Ignis","/index.html","main");

    // Sub Windows

    windowManager.templates.set("newProjectWindow", {
        width: 480,
        height: 650,
        resizable: false,
        showDevTools: false,
        menu: null,
        modal: true,
        parent: windowManager.windows["mainWindow"].object
    });

    windowManager.templates.set("loadProjectWindow", {
        width: 450,
        height: 510,
        resizable: false,
        showDevTools: false,
        menu: null,
        modal: true,
        parent: windowManager.windows["mainWindow"].object
    });

    windowManager.templates.set("importManagerWindow", {
        width: 800,
        height: 480,
        resizable: false,
        showDevTools: false,
        menu: null,
        modal: true,
        parent: windowManager.windows["mainWindow"].object
    });



});