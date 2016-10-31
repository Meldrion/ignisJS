"use strict";

/**
 *
 * @constructor
 */
function MapTree() {
    this.rootMaps = [];
    this.activeMap = null;
    this.activeMapListeners = [];
}


/**
 *
 * @param map
 * @param parent
 */
MapTree.prototype.addMap = function(map,parent) {
    if (parent === undefined || parent == null) {
        if (this.rootMaps.indexOf(map) == -1)
            this.rootMaps.push(map);
    } else {
        parent.addMap(map);
    }
};

/**
 *
 * @param mapfileName
 * @returns {*}
 */
MapTree.prototype.findMap = function(mapfileName) {
    var index = 0;
    var maxIndex = this.rootMaps.length;
    var foundMap = null;
    while (foundMap == null && index < maxIndex) {

        var cMap = this.rootMaps[index];
        if (cMap.filename == mapfileName) {
            foundMap = cMap;
        } else {
            foundMap = cMap.findMap(mapfileName);
            if (foundMap == null)
                index++;
        }
    }

    return foundMap;
};


/**
 *
 * @param mapListener
 */
MapTree.prototype.addListener = function (mapListener) {
    if (this.activeMapListeners.indexOf(mapListener) == -1) {
        this.activeMapListeners.push(mapListener);
    }
};


/**
 *
 */
MapTree.prototype.fireUpdate = function () {
    this.activeMapListeners.forEach(function (listener) {
        listener.activeMapChanged(this.activeMap);
    });
};


/**
 *
 * @param activeMap
 */
MapTree.prototype.setActiveMap = function (activeMap) {
    this.activeMap = activeMap;
    this.fireUpdate();
};

/**
 *
 * @returns {*[]}
 */
MapTree.prototype.getTree = function () {

    return [{
        text: "Project",
        nodes: [
            {
                text: "Map 0001",
                nodes: [
                    {
                        text: "Map 0003",
                        nodes: [{
                            text: "Map 0004",
                            nodes: [{
                                text: "Map 0005"
                            }]
                        },{
                            text: "Map 0006"
                        }]
                    }
                ]
            },
            {
                text: "Map 0002"
            }
        ]
    }]

};
