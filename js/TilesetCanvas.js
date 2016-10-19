/**
 *
 * @param canvas
 * @constructor
 */
function TilesetCanvas(canvas) {

    this.selectionListeners = [];
    this.mouseIsDown = false;

    this.selectionStartX = -1;
    this.selectionStartY = -1;
    this.selectionEndX = -1;
    this.selectionEndY = -1;

    this.tileset = null;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    var self = this;
    this.canvas.addEventListener("mousedown", function(event) {
        self.mouseIsDown = true;
        self.selectionStartX = parseInt( event.offsetX / 32);
        self.selectionStartY = parseInt( event.offsetY / 32);
        self.selectionEndX = self.selectionStartX;
        self.selectionEndY = self.selectionStartY;
        self.render();
    }, false);

    this.canvas.addEventListener("mousemove", function(event) {
        if (self.mouseIsDown == true) {
            self.selectionEndX = parseInt(event.offsetX / 32);
            self.selectionEndY = parseInt(event.offsetY  / 32);
            self.render();
        }
    },false);

    this.canvas.addEventListener("mouseup",function(event) {
        self.mouseIsDown = false;
        self.render();
        self.fireUpdate();
    }, false);

}

TilesetCanvas.prototype.render = function() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.tileset != null) {

        for (var i=0;i<this.canvas.width / 16;i++) {
            for (var j=0;j<this.canvas.height / 16;j++) {
                        
                if ((i + j) % 2 == 0) {
                    this.ctx.fillStyle = "#FFFFFF";
                } else {
                    this.ctx.fillStyle = "#ADADAD";
                }

                this.ctx.fillRect(i*16,j*16,16,16);
            }
        }

        this.ctx.drawImage(this.tileset.getTilesetImage(),0,0);

        if (this.selectionStartX >= 0 && this.selectionStartY >= 0) {

            var fixedCoords = fixCoords(this.selectionStartX,this.selectionStartY,
                this.selectionEndX,this.selectionEndY);

            var w = fixedCoords.x2 - fixedCoords.x1;
            var h = fixedCoords.y2 - fixedCoords.y1;

            this.ctx.fillStyle="#FF0000";
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillRect(fixedCoords.x1 * 32,fixedCoords.y1 * 32,w * 32,h * 32);
            this.ctx.globalAlpha = 1.0;
        }
    }
};

TilesetCanvas.prototype.setTileset = function(tileset) {
    this.tileset = tileset;
    if (this.tileset != null) {
        this.canvas.style.height = img.height;
        this.canvas.height = img.height;
    }
    this.render();
};

TilesetCanvas.prototype.activeMapChanged = function(map) {
    if (map != null) {
        this.setTileset(map.getTileset());
    } else {
        this.setTileset(null);
    }
};


TilesetCanvas.prototype.addSelectionListener = function(listener) {
    if (this.selectionListeners.indexOf(listener) == -1) {
        this.selectionListeners.push(listener);
    }
};

TilesetCanvas.prototype.fireUpdate = function() {

    var fixedCoords = fixCoords(this.selectionStartX,this.selectionStartY,
        this.selectionEndX,this.selectionEndY);

    this.selectionListeners.forEach(function (listener) {
        listener.selectionChanged(fixedCoords.x1,fixedCoords.y1,fixedCoords.x2,fixedCoords.y2);
    });

};