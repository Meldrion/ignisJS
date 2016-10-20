"use strict";

// Tileset Object
function Tileset() {
    this.tilesetImage = null;
    this.cellSize = 32;
}

Tileset.prototype.setImage = function (image) {
    this.tilesetImage = image;
};

Tileset.prototype.drawTileTo = function (tileX, tileY, mapX, mapY, ctx) {
    ctx.drawImage(this.tilesetImage, tileX * this.cellSize, tileY * this.cellSize, this.cellSize, this.cellSize,
        mapX * this.cellSize, mapY * this.cellSize, this.cellSize, this.cellSize);
};

Tileset.prototype.getTilesetImage = function () {
    return this.tilesetImage;
};