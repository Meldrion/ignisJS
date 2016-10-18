/**
 * @author Fabien Steines
 * @param canvas
 * @constructor
 */
function MapCanvas(canvas) {

    this.lastX = -1;
    this.lastY = -2;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.map = null;
    this.mouseIsDown = false;

    var self = this;

    this.canvas.addEventListener("mousedown", function(event) {

        var x = parseInt( event.offsetX / 32);
        var y = parseInt( event.offsetY / 32);

        self.map.setTile(2,x,y,2,1);
        self.map.renderPosition(self.ctx,x,y);

        self.mouseIsDown = true;
    }, false);

    this.canvas.addEventListener("mousemove", function(event) {
        if (self.mouseIsDown == true) {
            var x = parseInt( event.offsetX / 32);
            var y = parseInt( event.offsetY / 32);

            if (self.lastX != x || self.lastY != y) {
                self.map.setTile(2,x,y,2,1);
                self.map.renderPosition(self.ctx,x,y);
                self.lastX = x;
                self.lastY = y;
            }
        }
    },false);


    this.canvas.addEventListener("mouseup",function(event) {
        self.mouseIsDown = false;
    }, false);

}

MapCanvas.prototype = new ActiveMapListener();

MapCanvas.prototype.render = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.render(this.ctx);
};


MapCanvas.prototype.setMap = function(map) {
    this.map = map;
};


MapCanvas.prototype.activeMapChanged = function(map) {
    this.setMap(map);
};

MapCanvas.prototype.selectionChanged = function(x1,y1,x2,y2) {

};