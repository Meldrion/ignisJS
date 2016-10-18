function MapTree() {
    this.activeMap = null;
    this.activeMapListeners = [];
}


MapTree.prototype.addListener = function (mapListener) {
    if (!this.activeMapListeners.contains(mapListener)) {
        this.activeMapListeners.append(mapListener);
    }
};


MapTree.prototype.fireUpdate = function() {
    this.activeMapListeners.forEach(function(listener) {
        listener.activeMapChanged(this.activeMap);
    });
};

MapTree.prototype.setActiveMap = function(activeMap) {
    this.activeMap = activeMap;
    this.fireUpdate();
};

MapTree.prototype.getTree = function() {

    return [{
        text: "Project",
        nodes: [
            {
                text: "Map 0001"
            },
            {
                text: "Map 0002"
            }
        ]
    }]

};
