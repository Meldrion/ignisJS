// Instance of Layer

var img = new Image();
var tileset = new Tileset();
var map = new Map();

var tilesetCanvas = new TilesetCanvas(document.getElementById("tilesetCanvas"));
var mapCanvas = new MapCanvas(document.getElementById("mapCanvas"), document.getElementById("mapTopCanvas"));
var mapTree = new MapTree();
// In renderer process (web page).
const ipc = require('electron').ipcRenderer;


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

/*        for (var x = 0; x < map.width; x++) {
            for (var y = 0; y < map.height; y++) {
                map.setTile(0, x, y, 0, 0);
                map.setTile(1, x, y, 1, 1);
                map.setTile(2, x, y, 1, 0);
            }
        }*/

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
        addClass(layer3, "marked");
    }
}