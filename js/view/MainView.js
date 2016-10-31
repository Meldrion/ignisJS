// Instance of Layer

// In renderer process (web page).
//const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
var windowManager = remote.require('../js/npm/electron-window-manager');

// Init the Project Manager
ProjectManager.getInstance().init();
windowManager.sharedData.set("projectManager", ProjectManager.getInstance() );

var img = new Image();
var tileset = new Tileset();
var map = new Map();

var tilesetCanvas = new TilesetCanvas(document.getElementById("tilesetCanvas"));
var mapCanvas = new MapCanvas(document.getElementById("mapCanvas"), document.getElementById("mapTopCanvas"));
var mapTree = new MapTree();

function openNewProjectWindow() {
    var newProjectWindow = windowManager.
        createNew('newProjectWindow', 'New Project',windowManager.convert("view/NewProjectView.html"),"newProjectWindow");
    newProjectWindow.open();
}

window.onload = function () {

    img.onload = function () {

        tileset.setImage(img);
        tilesetCanvas.setTileset(tileset);
        map.setSize(50, 50);

        var c = document.getElementById("mapCanvas");
        c.style.width = map.width * 32;
        c.style.height = map.height * 32;
        c.width = c.offsetWidth;
        c.height = c.offsetHeight;


        var topLayerCanvas = document.getElementById("mapTopCanvas");
        topLayerCanvas.style.width = map.width * 32;
        topLayerCanvas.style.height = map.height * 32;
        topLayerCanvas.width = map.width * 32;
        topLayerCanvas.height = map.height * 32;

        map.setTileset(tileset);

        var canvas = document.getElementById("tilesetCanvas");
        canvas.style.height = img.height;
        canvas.height = img.height;

        mapCanvas.setMap(map);
        mapCanvas.render();

        tilesetCanvas.render();
        tilesetCanvas.addSelectionListener(mapCanvas);
    };

    img.src = '../assets/cave.png';
    onresize();
};

window.onresize = function () {
    var ms = document.getElementById("mapCanvasScroller");
    ms.style.width = window.innerWidth - 300;
    ms.style.height = window.innerHeight - 40 - 25;
    var tsScroller = document.getElementById("tilesetCanvasScroller");
    tsScroller.style.height = window.innerHeight * 0.6;
    var mtScroller = document.getElementById("mapTree");
    mtScroller.style.maxHeight = window.innerHeight - tsScroller.clientHeight - 48 - 25;
    mtScroller.style.minHeight = window.innerHeight - tsScroller.clientHeight - 48 - 25;

};

$(document).ready(function () {
    $('#mapTree').treeview({
        showBorder: false,
        showTags: true,
        selectedBackColor: "orange",
        highlightSelected: true,
        expandIcon: 'glyphicon glyphicon-chevron-right',
        collapseIcon: 'glyphicon glyphicon-chevron-down',
        nodeIcon: 'glyphicon glyphicon-file',
        data: mapTree.getTree()
    });
});

// Tools
function btnPenClicked() {

    var penButton = document.getElementById("penButton");
    if (!containsClass(penButton, "disabled-toolbutton")) {
        //mapCanvas.setActiveLayer(0);
        //mapCanvas.render();
        removeClass(document.getElementById("brushButton"), "marked");
        removeClass(document.getElementById("fillButton"), "marked");
        removeClass(document.getElementById("eraseButton"), "marked");
        addClass(penButton, "marked");
        mapCanvas.setActiveMapTool(MapCanvas.TOOL_PEN);
    }
}

function btnBrushClicked() {

    var brushButton = document.getElementById("brushButton");
    if (!containsClass(brushButton, "disabled-toolbutton")) {
        //mapCanvas.setActiveLayer(0);
        //mapCanvas.render();
        removeClass(document.getElementById("penButton"), "marked");
        removeClass(document.getElementById("fillButton"), "marked");
        removeClass(document.getElementById("eraseButton"), "marked");
        addClass(brushButton, "marked");
        mapCanvas.setActiveMapTool(MapCanvas.TOOL_BRUSH);
    }
}

function btnFillClicked() {

    var fillButton = document.getElementById("fillButton");
    if (!containsClass(fillButton, "disabled-toolbutton")) {
        //mapCanvas.setActiveLayer(0);
        //mapCanvas.render();
        removeClass(document.getElementById("brushButton"), "marked");
        removeClass(document.getElementById("penButton"), "marked");
        removeClass(document.getElementById("eraseButton"), "marked");
        addClass(fillButton, "marked");
        mapCanvas.setActiveMapTool(MapCanvas.TOOL_FILL);
    }
}

function btnEraseClicked() {

    var eraseButton = document.getElementById("eraseButton");
    if (!containsClass(eraseButton, "disabled-toolbutton")) {
        //mapCanvas.setActiveLayer(0);
        //mapCanvas.render();
        removeClass(document.getElementById("brushButton"), "marked");
        removeClass(document.getElementById("fillButton"), "marked");
        removeClass(document.getElementById("penButton"), "marked");
        addClass(eraseButton, "marked");
        mapCanvas.setActiveMapTool(MapCanvas.TOOL_ERASE);
    }
}

// Layers
function btnLayer1Click() {

    var layer1 = document.getElementById("layer1");
    if (!containsClass(layer1, "disabled-toolbutton")) {
        mapCanvas.setActiveLayer(0);
        mapCanvas.render();
        removeClass(document.getElementById("layer2"), "marked");
        removeClass(document.getElementById("layer3"), "marked");
        removeClass(document.getElementById("layer4"), "marked");
        addClass(layer1, "marked");
    }
}

function btnLayer2Click() {

    var layer2 = document.getElementById("layer2");
    if (!containsClass(layer2, "disabled-toolbutton")) {
        mapCanvas.setActiveLayer(1);
        mapCanvas.render();
        removeClass(document.getElementById("layer1"), "marked");
        removeClass(document.getElementById("layer3"), "marked");
        removeClass(document.getElementById("layer4"), "marked");
        addClass(layer2, "marked");
    }
}

function btnLayer3Click() {

    var layer3 = document.getElementById("layer3");
    if (!containsClass(layer3, "disabled-toolbutton")) {
        mapCanvas.setActiveLayer(2);
        mapCanvas.render();
        removeClass(document.getElementById("layer1"), "marked");
        removeClass(document.getElementById("layer2"), "marked");
        removeClass(document.getElementById("layer4"), "marked");
        addClass(layer3, "marked");
    }
}

function btnLayer4Click() {

    var layer4 = document.getElementById("layer4");
    if (!containsClass(layer4, "disabled-toolbutton")) {
        mapCanvas.setActiveLayer(3);
        mapCanvas.render();
        removeClass(document.getElementById("layer1"), "marked");
        removeClass(document.getElementById("layer2"), "marked");
        removeClass(document.getElementById("layer3"), "marked");
        addClass(layer4, "marked");
    }
}

function btnImportManagerClicked() {
    var loadProjectWindow = windowManager.
    createNew('importManagerWindow', 'Import Manager',windowManager.convert("view/ImportManagerView.html"),"importManagerWindow");
    loadProjectWindow.open();
}

function btnLoadClicked() {
    var loadProjectWindow = windowManager.
    createNew('loadProjectWindow', 'Load Project',windowManager.convert("view/LoadProjectView.html"),"loadProjectWindow");
    loadProjectWindow.open();
}

function btnSaveClicked() {
    map.save();
}

windowManager.bridge.on("activeProjectChanged",function(project) {

    if (project != null && project != undefined) {
        removeClass(document.getElementById("saveProjectButton"),"disabled-toolbutton");
        removeClass(document.getElementById("penButton"),"disabled-toolbutton");
        removeClass(document.getElementById("brushButton"),"disabled-toolbutton");
        removeClass(document.getElementById("fillButton"),"disabled-toolbutton");
        removeClass(document.getElementById("eraseButton"),"disabled-toolbutton");
        removeClass(document.getElementById("layer1"),"disabled-toolbutton");
        removeClass(document.getElementById("layer2"),"disabled-toolbutton");
        removeClass(document.getElementById("layer3"),"disabled-toolbutton");
        removeClass(document.getElementById("layer4"),"disabled-toolbutton");
        removeClass(document.getElementById("importManager"),"disabled-toolbutton");
        removeClass(document.getElementById("mapCanvasScroller"),"hiddenClass");
        removeClass(document.getElementById("leftSection"),"hiddenClass");
    } else {
        addClass(document.getElementById("saveProjectButton"),"disabled-toolbutton");
        addClass(document.getElementById("penButton"),"disabled-toolbutton");
        addClass(document.getElementById("brushButton"),"disabled-toolbutton");
        addClass(document.getElementById("fillButton"),"disabled-toolbutton");
        addClass(document.getElementById("eraseButton"),"disabled-toolbutton");
        addClass(document.getElementById("layer1"),"disabled-toolbutton");
        addClass(document.getElementById("layer2"),"disabled-toolbutton");
        addClass(document.getElementById("layer3"),"disabled-toolbutton");
        addClass(document.getElementById("layer4"),"disabled-toolbutton");
        addClass(document.getElementById("importManager"),"disabled-toolbutton");
        addClass(document.getElementById("mapCanvasScroller"),"hiddenClass");
        addClass(document.getElementById("leftSection"),"hiddenClass");
    }

    ProjectManager.getInstance().setProject(project);
});

windowManager.bridge.on("projectManagerChanged",function(projectManagerJSON) {

    ProjectManager.getInstance().syncData(projectManagerJSON);
    windowManager.sharedData.set("projectManager",ProjectManager.getInstance());
});

windowManager.bridge.on("newProjectMenuClicked",function() {
    openNewProjectWindow();
});

windowManager.bridge.on("loadProjectMenuClicked",function() {
    btnLoadClicked();
});


// Dynamic Menu for right click
const {Menu, MenuItem} = remote;

const menu = new Menu();
menu.append(new MenuItem({label: 'MenuItem1', click: function() { console.log('item 1 clicked') }}));
menu.append(new MenuItem({type: 'separator'}));
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}));

window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
menu.popup(remote.getCurrentWindow())
}, false);