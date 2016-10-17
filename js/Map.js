/**
 *
 * @constructor
 */
function Map() {
    this.width = 20;
    this.height = 15;
    this.tileset = null;
    this.layers = [new TileLayer(),new TileLayer(),new TileLayer()];
}


Map.prototype.setTile = function(layer,x,y,tX,tY) {
    this.layers[layer].setTile(x,y,new TilesetLayerCell(tX,tY));
};

/**
 *
 * @param tileset
 */
Map.prototype.setTileset = function(tileset) {
    for (var i = 0;i<this.layers.length;i++) {
        this.layers[i].setTileset(tileset);
    }
};

/**
 *
 * @param width
 * @param height
 */
Map.prototype.setSize = function(width,height) {
    this.width = width;
    this.height = height;
    for (var i = 0;i<this.layers.length;i++) {
        this.layers[i].setSize(this.width,this.height);
    }
};

/**
 *
 * @param ctx
 */
Map.prototype.render = function(ctx) {
    for (var i=0;i<this.layers.length;i++) {
        this.layers[i].render(ctx);
    }
};