/**
 *
 * @constructor
 */
function TileLayer() {
    this.tileset = null;
}

/**
 * @type {Layer}
 */
TileLayer.prototype = new Layer();

/**
 *
 * @param ctx
 */
TileLayer.prototype.render = function(ctx) {

    for (var i=0;i<this.width;i++) {
        for (var j=0;j<this.height;j++) {
            var tile = this.getTile(i,j);

            if (tile != null) {
                tileset.drawTileTo(tile.getX(),tile.getY(),i,j,ctx);
            }

        }
    }
};

/**
 *
 * @param tileset
 */
TileLayer.prototype.setTileset = function(tileset) {
    this.tileset = tileset;
};

/**
 *
 * @param x
 * @param y
 * @param tile
 */
TileLayer.prototype.setTile = function(x,y,tile) {
    this.layerMatrix[x][y] = tile;
};

/**
 *
 * @param x
 * @param y
 * @returns {*}
 */
TileLayer.prototype.getTile = function(x,y) {
    return this.layerMatrix[x][y];
};