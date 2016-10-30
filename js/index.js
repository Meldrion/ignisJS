"use strict";

const electron = require('electron');
const application = electron.app;
//const menu = electron.menu;
const windowManager = require('./npm/electron-window-manager');


application.on('ready', function(){
    windowManager.init();

    windowManager.templates.set('main', {
        width: 800,
        height: 600,
        resizable: true,
        showDevTools: true,
        title: 'Ignis',
        icon:"assets/calci-64x64.png",
    });

    var main = windowManager.open("mainWindow","Ignis","/index.html","main");
    main.object.setMenu(null);
    // Sub Windows

    windowManager.templates.set("newProjectWindow", {
        width: 480,
        height: 650,
        resizable: false,
        showDevTools: true,
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