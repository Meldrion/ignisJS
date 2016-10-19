/**
 * @author Fabien Steines
 * @param canvas
 * @constructor
 */
function MapCanvas(canvas) {

    this.activeLayerId = 0;

    this.tilesetSelectionStartX = -1;
    this.tilesetSelectionStartY = -1;
    this.tilesetSelectionEndX = -1;
    this.tilesetSelectionEndY = -1;

    this.lastX = -1;
    this.lastY = -2;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = null;
    this.mouseIsDown = false;

    var self = this;

    this.canvas.addEventListener("mousedown", function(event) {

        if (self.tilesetSelectionStartX != -1 && self.tilesetSelectionStartY != -1) {
            var x = parseInt(event.offsetX / 32);
            var y = parseInt(event.offsetY / 32);

            self.addSelection(x,y,
                self.tilesetSelectionStartX,
                self.tilesetSelectionStartY,
                self.tilesetSelectionEndX,
                self.tilesetSelectionEndY);
        }
        self.mouseIsDown = true;
    }, false);

    this.canvas.addEventListener("mousemove", function(event) {

        if (self.mouseIsDown == true
            && self.tilesetSelectionStartX != -1 && self.tilesetSelectionStartY != -1) {

            var x = parseInt( event.offsetX / 32);
            var y = parseInt( event.offsetY / 32);

            if (self.lastX != x || self.lastY != y) {

                self.addSelection(x,y,
                    self.tilesetSelectionStartX,
                    self.tilesetSelectionStartY,
                    self.tilesetSelectionEndX,
                    self.tilesetSelectionEndY);

                self.lastX = x;
                self.lastY = y;
            }
        }

    },false);

    this.canvas.addEventListener("mouseup",function(event) {
        self.mouseIsDown = false;
    }, false);

}

MapCanvas.prototype.addSelection = function(x,y,tsX1,tsY1,tsX2,tsY2) {

    var w = tsX2 - tsX1;
    var h = tsY2 - tsY1;

    for (var tX = 0;tX < w;tX++) {
        for (var tY = 0;tY < h;tY++) {
            this.map.setTile(this.activeLayerId,x + tX,y + tY,tsX1 + tX,tsY1 + tY);
            this.map.renderPosition(this.ctx,x + tX,y + tY);
        }
    }

};

MapCanvas.prototype.render = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.render(this.ctx,this.activeLayerId);
};

MapCanvas.prototype.setMap = function(map) {
    this.map = map;
};

MapCanvas.prototype.activeMapChanged = function(map) {
    this.setMap(map);
};

MapCanvas.prototype.selectionChanged = function(x1,y1,x2,y2) {
    this.tilesetSelectionStartX = x1;
    this.tilesetSelectionStartY = y1;
    this.tilesetSelectionEndX = x2;
    this.tilesetSelectionEndY = y2;
};

MapCanvas.prototype.setActiveLayer = function(layerId) {
    this.activeLayerId = layerId;
};