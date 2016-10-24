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

    /**
     * Mouse Down Event
     */
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
                    self.brushEndX = x;
                    self.brushEndY = y;
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

    /**
     * Mouse Move Event
     */
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

    /**
     * Mouse Up Event
     */
    this.cursorCanvas.addEventListener("mouseup", function (event) {

        self.mouseIsDown = false;

        if (self.activeToolId == MapCanvas.TOOL_BRUSH) {
            self.addSelectionRange(self.brushStartX,self.brushStartY,self.brushEndX,self.brushEndY,
                                   self.tilesetSelectionStartX,self.tilesetSelectionStartY,
                                   self.tilesetSelectionEndX,self.tilesetSelectionEndY);

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

MapCanvas.prototype.addSelectionRange = function (x1, y1,x2,y2, tsX1, tsY1, tsX2, tsY2) {

    var w = x2 - x1;
    var h = y2 - y1;

    var tsW = tsX2 - tsX1;
    var tsH = tsY2 - tsY1;

    var tsX = 0;
    var tsY = 0;

    for (var cX = 0; cX <= w;cX++) {
        for (var cY = 0; cY <= h; cY++) {

            this.map.setTile(this.activeLayerId, x1 + cX, y1 + cY, tsX1 + tsX, tsY1 + tsY);
            this.map.renderPosition(this.ctx, x1 + cX, y1 + cY,this.activeLayerId);

            tsY += 1;
            if (tsY == tsH) {
                tsY = 0;
            }
        }

        tsX += 1;
        tsY = 0;

        if (tsX == tsW) {
            tsX = 0;
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

        var i = 0;
        var j = 0;
        var tileset = this.map.getTileset();

        if (this.activeToolId == MapCanvas.TOOL_PEN ||
            (this.activeToolId == MapCanvas.TOOL_BRUSH && !this.mouseIsDown)) {

            for ( i = 0; i < this.tilesetSelectionEndX - this.tilesetSelectionStartX; i++) {
                for (j = 0; j < this.tilesetSelectionEndY - this.tilesetSelectionStartY; j++) {

                    tileset.drawTileTo(this.tilesetSelectionStartX + i,
                        this.tilesetSelectionStartY + j, (x / 32) + i, (y / 32) + j, this.cursorCanvasCTX);
                }
            }

        } else {

            if (this.activeToolId == MapCanvas.TOOL_BRUSH && this.mouseIsDown) {
                var w = width / 32;
                var h = height / 32;
                var tsW = this.tilesetSelectionEndX - this.tilesetSelectionStartX;
                var tsH = this.tilesetSelectionEndY - this.tilesetSelectionStartY;

                var tsX = 0;
                var tsY = 0;

                for (i = 0; i <w; i++) {

                    for (j = 0; j < h; j++) {
                        tileset.drawTileTo(this.tilesetSelectionStartX + tsX,
                            this.tilesetSelectionStartY + tsY, (x / 32) + i, (y / 32) + j, this.cursorCanvasCTX);
                        tsY += 1;
                        if (tsY == tsH) {
                            tsY = 0;
                        }
                    }

                    tsX += 1;
                    tsY = 0;

                    if (tsX == tsW) {
                        tsX = 0;
                    }
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