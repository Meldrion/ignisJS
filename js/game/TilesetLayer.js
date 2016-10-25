"use strict";

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
TileLayer.prototype.render = function (ctx) {

    for (var i = 0; i < this.width; i++) {
        for (var j = 0; j < this.height; j++) {
            var tile = this.getTile(i, j);

            if (tile != null) {
                tileset.drawTileTo(tile.getX(), tile.getY(), i, j, ctx);
            }
        }
    }
};

/**
 *
 * @param tileset
 */
TileLayer.prototype.setTileset = function (tileset) {
    this.tileset = tileset;
};

/**
 *
 * @param x
 * @param y
 * @param tile
 */
TileLayer.prototype.setTile = function (x, y, tile) {
    this.layerMatrix[x][y] = tile;
};

/**
 *
 * @param x
 * @param y
 */
TileLayer.prototype.removeTile = function(x,y) {
    this.layerMatrix[x][y] = null;
};

/**
 *
 * @param x
 * @param y
 * @returns {*}
 */
TileLayer.prototype.getTile = function (x, y) {
    return this.layerMatrix[x][y];
};


/**
 *
 * @param ctx
 * @param x
 * @param y
 */
TileLayer.prototype.renderPosition = function (ctx, x, y) {
    var tile = this.getTile(x, y);

    if (tile != null) {
        tileset.drawTileTo(tile.getX(), tile.getY(), x, y, ctx);
    }
};

/**
 *
 */
TileLayer.prototype.getJSON = function() {

    var JSONLayer = {data:[]};
    for (var i=0;i<this.layerMatrix.length;i++) {
        for (var j=0;j<this.layerMatrix[0].length;j++) {
            var element = this.layerMatrix[i][j];
            if (element != null) {
                var JSONLine = {x:i,y:j,tsX:element.getX(),tsY:element.getY()};
                JSONLayer.data.push(JSONLine);
            }
        }
    }

    return JSONLayer;
};