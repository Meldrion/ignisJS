"use strict";

/**
 *
 * @constructor
 */
function Layer() {
    this.width = 20;
    this.height = 15;
    this.layerMatrix = [];
    this.buildMatrix();
}

/**
 *
 */
Layer.prototype.buildMatrix = function () {
    this.layerMatrix = [];
    for (var w = 0; w < this.width; w++) {
        var innerArray = [];
        for (var h = 0; h < this.height; h++) {
            innerArray.push(null);
        }
        this.layerMatrix.push(innerArray);
    }
};

/**
 *
 */
Layer.prototype.wipeLayerData = function() {
    for (var w = 0;w <  this.width;w++) {
        for (var h = 0;h <  this.height;h++) {
            this.layerMatrix[w][h] = null;
        }
    }
};

/**
 *
 * @param width
 * @param height
 */
Layer.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    this.buildMatrix();
};

Layer.prototype.getJSON = function() {};

Layer.prototype.fromJSON = function(layerData) {};