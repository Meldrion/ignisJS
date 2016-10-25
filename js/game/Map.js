"use strict";

/**
 *
 * @constructor
 *
 * */

function Map() {
    this.name = "Untitled";
    this.width = 20;
    this.height = 15;
    this.tileset = null;
    this.layers = [new TileLayer(), new TileLayer(), new TileLayer()];
}

Map.prototype.setTile = function (layer, x, y, tX, tY) {
    this.layers[layer].setTile(x, y, new TilesetLayerCell(tX, tY));
};

Map.prototype.removeTile = function(layer,x,y) {
    this.layers[layer].removeTile(x,y);
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

        if (activeLayer != 3) {
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

        } else {

            this.layers[i].render(ctx);

            ctx.strokeStyle = '#333';
            ctx.globalAlpha = 0.5;

            var maxX = this.width * 32;
            var maxY = this.height * 32;


            for (var x=0;x<this.width;x++) {
                var xi = x * 32;

                ctx.beginPath();
                ctx.moveTo(xi, 0);
                ctx.lineTo(xi, maxY);
                ctx.stroke();

            }

            for (var y=0;y<this.height;y++) {
                var yi = y * 32;

                ctx.beginPath();
                ctx.moveTo(0, yi);
                ctx.lineTo(maxX, yi);
                ctx.stroke();
            }

            ctx.globalAlpha = 1;
        }

    }

    ctx.globalAlpha = 1;
};

/**
 * @param ctx
 * @param x
 * @param y
 * @param activeLayer
 */
Map.prototype.renderPosition = function (ctx, x, y, activeLayer) {

    ctx.clearRect(x * 32, y * 32, 32, 32);
    for (var i = 0; i < this.layers.length; i++) {

        ctx.globalAlpha = 1;

        if (i == activeLayer && i != 0) {

            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "#000";
            ctx.fillRect(x * 32, y * 32, 32, 32);

            ctx.globalAlpha = 1;
        }

        if (activeLayer < i) {
            ctx.globalAlpha = 0.5;
        }

        this.layers[i].renderPosition(ctx, x, y);
    }

    ctx.globalAlpha = 1;

};

/**
 *
 */
Map.prototype.save =  function() {
    var map = {name:"Hello World",
               width:this.width,
               heigt:this.height,
               layer:[]
              };
    this.layers.forEach(function(layer) {
        map.layer.push(layer.getJSON());
    });
    var fs = new FileSystemHandler();
    fs.writeJSON("/home/fabien/Desktop/map.json",map);
};

/**
 *
 */
Map.prototype.load = function() {

    var fs = new FileSystemHandler();
    var map = fs.readJSON("/home/fabien/Desktop/map.json");

    this.name = map.name;
    this.width = map.width;
    this.height = map.height;

    this.setSize(this.width,this.height);

    for (var index = 0;index < this.layers.length;index++) {
        this.layers[index].fromJSON(map.layer[index]);
    }

};