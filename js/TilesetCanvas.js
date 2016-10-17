/**
 *
 * @param canvas
 * @constructor
 */
function TilesetCanvas(canvas) {

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
        self.selectionEndX = self.selectionStartX + 1;
        self.selectionEndY = self.selectionStartY + 1;
        self.render();
    }, false);

    this.canvas.addEventListener("mousemove", function(event) {
        if (self.mouseIsDown == true) {
            self.selectionEndX = parseInt(event.offsetX / 32) + 1;
            self.selectionEndY = parseInt(event.offsetY  / 32) + 1;
            self.render();
        }
    },false);


    this.canvas.addEventListener("mouseup",function(event) {
        self.mouseIsDown = false;
        self.render();
    }, false);
}

TilesetCanvas.prototype.render = function() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.tileset != null) {
        this.ctx.drawImage(this.tileset.getTilesetImage(),0,0);

        if (this.selectionStartX >= 0 && this.selectionStartY >= 0) {

            var w = this.selectionEndX - this.selectionStartX;
            var h = this.selectionEndY - this.selectionStartY;

            this.ctx.fillStyle="#FF0000";
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillRect(this.selectionStartX * 32,this.selectionStartY * 32,w * 32,h * 32);
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