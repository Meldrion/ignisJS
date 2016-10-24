"use strict";

/**
 * @author Fabien Steines
 * @param canvas
 * @param cursorCanvas
 * @constructor
 */
function MapCanvas(canvas, cursorCanvas) {

    this.activeLayerId = 0;
    this.activeToolId = MapCanvas.TOOL_PEN;

    this.brushStartX = -1;
    this.brushStartY = -1;
    this.brushEndX = -1;
    this.brushEndY = -1;

    this.tilesetSelectionStartX = -1;
    this.tilesetSelectionStartY = -1;
    this.tilesetSelectionEndX = -1;
    this.tilesetSelectionEndY = -1;

    this.lastCursorRegionX = -1;
    this.lastCursorRegionY = -1;
    this.lastCursorRegionWidth = -1;
    this.lastCursorRegionHeight = -1;

    this.lastX = -1;
    this.lastY = -1;

    this.x = -1;
    this.y = -1;

    this.canvas = canvas;
    this.cursorCanvas = cursorCanvas;

    this.ctx = canvas.getContext("2d");
    this.cursorCanvasCTX = this.cursorCanvas.getContext("2d");

    this.map = null;
    this.mouseIsDown = false;
    this.mouseIsInside = false;

    var self = this;

    this.cursorCanvas.addEventListener("mousedown", function (event) {

        if (self.tilesetSelectionStartX != -1 && self.tilesetSelectionStartY != -1) {

            var x = parseInt(event.offsetX / 32);
            var y = parseInt(event.offsetY / 32);


            switch (self.activeToolId) {

                case MapCanvas.TOOL_PEN:

                    self.addSelection(x, y,
                        self.tilesetSelectionStartX,
                        self.tilesetSelectionStartY,
                        self.tilesetSelectionEndX,
                        self.tilesetSelectionEndY);

                    break;

                case MapCanvas.TOOL_BRUSH:
                    self.brushStartX = x;
                    self.brushStartY = y;
                    break;

                case MapCanvas.TOOL_ERASE:
                    self.removeAtCursor(x,y);
                    break;

                default:
                    break;
            }
        }
        self.mouseIsDown = true;
    }, false);

    this.cursorCanvas.addEventListener("mousemove", function (event) {

        self.x = parseInt(event.offsetX / 32);
        self.y = parseInt(event.offsetY / 32);


        if (self.lastX != self.x || self.lastY != self.y) {

            if (self.tilesetSelectionStartX != -1 && self.tilesetSelectionStartY != -1) {

                switch (self.activeToolId) {

                    case MapCanvas.TOOL_PEN:

                        if (self.mouseIsDown == true) {

                            self.addSelection(self.x, self.y,
                                self.tilesetSelectionStartX,
                                self.tilesetSelectionStartY,
                                self.tilesetSelectionEndX,
                                self.tilesetSelectionEndY);
                        }

                        self.renderCursor(self.x * 32, self.y * 32,
                            (self.tilesetSelectionEndX - self.tilesetSelectionStartX) * 32,
                            (self.tilesetSelectionEndY - self.tilesetSelectionStartY) * 32);
                        break;

                    case MapCanvas.TOOL_BRUSH:

                        if (self.mouseIsDown == true) {
                            self.brushEndX = self.x;
                            self.brushEndY = self.y;

                            var coords = fixCoords(self.brushStartX,self.brushStartY,self.brushEndX,self.brushEndY);

                            self.renderCursor(coords.x1 * 32,coords.y1 * 32,
                                (coords.x2 - coords.x1) * 32, (coords.y2 - coords.y1) * 32);
                        } else {

                            self.renderCursor(self.x * 32, self.y * 32,
                                (self.tilesetSelectionEndX - self.tilesetSelectionStartX) * 32,
                                (self.tilesetSelectionEndY - self.tilesetSelectionStartY) * 32);

                        }

                        break;

                    case MapCanvas.TOOL_ERASE:

                        if (self.mouseIsDown == true) {
                            self.removeAtCursor(x, y);
                        }

                        self.renderCursor(self.x * 32, self.y * 32, 32, 32);

                        break;

                    default:
                        break;
                }

            }

            self.lastX = self.x;
            self.lastY = self.y;
        }

    }, false);

    this.cursorCanvas.addEventListener("mouseup", function (event) {
        self.mouseIsDown = false;

        if (self.activeToolId == MapCanvas.TOOL_BRUSH) {
            self.renderCursor(self.x * 32, self.y * 32,
                (self.tilesetSelectionEndX - self.tilesetSelectionStartX) * 32,
                (self.tilesetSelectionEndY - self.tilesetSelectionStartY) * 32);
        }
    }, false);


    this.cursorCanvas.addEventListener("mouseleave", function (event) {
        self.mouseIsInside = false;
        self.renderCursor(0,0,0,0);
    }, false);


    this.cursorCanvas.addEventListener("mouseenter", function (event) {
        self.mouseIsInside = true;
    }, false);

}

MapCanvas.prototype.addSelection = function (x, y, tsX1, tsY1, tsX2, tsY2) {

    var w = tsX2 - tsX1;
    var h = tsY2 - tsY1;

    for (var tX = 0; tX < w; tX++) {
        for (var tY = 0; tY < h; tY++) {
            this.map.setTile(this.activeLayerId, x + tX, y + tY, tsX1 + tX, tsY1 + tY);
            this.map.renderPosition(this.ctx, x + tX, y + tY,this.activeLayerId);
        }
    }
};

MapCanvas.prototype.removeAtCursor = function (x, y) {
    this.map.removeTile(this.activeLayerId, x ,y);
    this.map.renderPosition(this.ctx, x , y ,this.activeLayerId);
};

MapCanvas.prototype.render = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.render(this.ctx, this.activeLayerId);
};

MapCanvas.prototype.setMap = function (map) {
    this.map = map;
};

MapCanvas.prototype.activeMapChanged = function (map) {
    this.setMap(map);
};

MapCanvas.prototype.selectionChanged = function (x1, y1, x2, y2) {
    this.tilesetSelectionStartX = x1;
    this.tilesetSelectionStartY = y1;
    this.tilesetSelectionEndX = x2;
    this.tilesetSelectionEndY = y2;
};

MapCanvas.prototype.setActiveLayer = function (layerId) {
    this.activeLayerId = layerId;
};

MapCanvas.prototype.renderCursor = function (x, y, width, height) {

    console.log("Update cursor call");

    if (this.lastCursorRegionX > -1 && this.lastCursorRegionY > -1) {

        // Add one pixel on each side of the rect, to avoid this strange line behaviour on windows
        this.cursorCanvasCTX.clearRect(this.lastCursorRegionX - 1, this.lastCursorRegionY - 1,
            this.lastCursorRegionWidth + 2, this.lastCursorRegionHeight + 2);
    }

    if (this.mouseIsInside == true && this.map != null) {

        this.cursorCanvasCTX.globalAlpha = 0.5;
        this.cursorCanvasCTX.fillStyle = "#FF0000";
        this.cursorCanvasCTX.fillRect(x, y, width, height);

        // Draw Cursor Selection

        if (this.activeToolId == MapCanvas.TOOL_PEN ||
            (this.activeToolId == MapCanvas.TOOL_BRUSH && !this.mouseIsDown)) {

            var tileset = this.map.getTileset();

            for (var i = 0; i < this.tilesetSelectionEndX - this.tilesetSelectionStartX; i++) {
                for (var j = 0; j < this.tilesetSelectionEndY - this.tilesetSelectionStartY; j++) {

                    tileset.drawTileTo(this.tilesetSelectionStartX + i,
                        this.tilesetSelectionStartY + j, (x / 32) + i, (y / 32) + j, this.cursorCanvasCTX);
                }
            }
        }



        this.cursorCanvasCTX.globalAlpha = 1;
    }

    this.lastCursorRegionX = x;
    this.lastCursorRegionY = y;
    this.lastCursorRegionWidth = width;
    this.lastCursorRegionHeight = height;

};

MapCanvas.prototype.setActiveMapTool = function(activeMapTool) {
    this.activeToolId = activeMapTool;
};

MapCanvas.TOOL_PEN = 0x0;
MapCanvas.TOOL_BRUSH = 0x1;
MapCanvas.TOOL_FILL = 0x2;
MapCanvas.TOOL_ERASE = 0x3;