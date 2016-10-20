/**
 *
 * @constructor
 *
 * */

function Map() {
    this.width = 20;
    this.height = 15;
    this.tileset = null;
    this.layers = [new TileLayer(), new TileLayer(), new TileLayer()];
}

Map.prototype.setTile = function (layer, x, y, tX, tY) {
    this.layers[layer].setTile(x, y, new TilesetLayerCell(tX, tY));
};

/**
 *
 * @param tileset
 */
Map.prototype.setTileset = function (tileset) {
    for (var i = 0; i < this.layers.length; i++) {
        this.layers[i].setTileset(tileset);
    }
    this.tileset = tileset;
};

Map.prototype.getTileset = function () {
    return this.tileset;
};

/**
 *
 * @param width
 * @param height
 */
Map.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    for (var i = 0; i < this.layers.length; i++) {
        this.layers[i].setSize(this.width, this.height);
    }
};

/**
 *
 * @param ctx
 * @param activeLayer
 */
Map.prototype.render = function (ctx, activeLayer) {

    for (var i = 0; i < this.layers.length; i++) {

        ctx.globalAlpha = 1;

        if (i == activeLayer && i != 0) {

            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, this.width * 32, this.height * 32);

            ctx.globalAlpha = 1;
        }

        if (activeLayer < i) {
            ctx.globalAlpha = 0.5;
        }

        this.layers[i].render(ctx);
    }
};

/**
 *
 * @param ctx
 * @param x
 * @param y
 */
Map.prototype.renderPosition = function (ctx, x, y) {

    ctx.clearRect(x * 32, y * 32, 32, 32);
    for (var i = 0; i < this.layers.length; i++) {
        this.layers[i].renderPosition(ctx, x, y);
    }

};