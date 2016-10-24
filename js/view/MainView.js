// Instance of Layer

// In renderer process (web page).
const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;

// Init the Project Manager
ProjectManager.getInstance().init();
remote.getGlobal('sharedObject').projectManager = ProjectManager.getInstance();

var img = new Image();
var tileset = new Tileset();
var map = new Map();

var tilesetCanvas = new TilesetCanvas(document.getElementById("tilesetCanvas"));
var mapCanvas = new MapCanvas(document.getElementById("mapCanvas"), document.getElementById("mapTopCanvas"));
var mapTree = new MapTree();



function openNewProjectWindow() {
    ipc.send("openNewProjectWindow");
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

    img.src = 'assets/cave.png';
    onresize();
};

window.onresize = function () {
    var ms = document.getElementById("mapCanvasScroller");
    ms.style.width = window.innerWidth - 300;
    ms.style.height = window.innerHeight - 40;
    var tsScroller = document.getElementById("tilesetCanvasScroller");
    tsScroller.style.height = window.innerHeight * 0.7;
    var mtScroller = document.getElementById("mapTree");
    mtScroller.style.maxHeight = window.innerHeight - tsScroller.clientHeight - 48;
    mtScroller.style.minHeight = window.innerHeight - tsScroller.clientHeight - 48;

};

$(document).ready(function () {
    $('#mapTree').treeview({
        showBorder: false,
        showTags: true,
        selectedBackColor: "orange",
        highlightSelected: true,
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
    ipc.send("openImportManagerWindow");
}