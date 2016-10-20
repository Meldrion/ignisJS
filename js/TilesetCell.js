"use strict";

/**
 *
 * @param tsX
 * @param tsY
 * @constructor
 */
function TilesetLayerCell(tsX, tsY) {
    this.tilesetX = tsX;
    this.tilesetY = tsY;
}

/**
 *
 * @returns {*}
 */
TilesetLayerCell.prototype.getX = function () {
    return this.tilesetX;
};

/**
 *
 * @returns {*}
 */
TilesetLayerCell.prototype.getY = function () {
    return this.tilesetY;
};