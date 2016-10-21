function AssetStructure(projectRoot) {
    this.projectRoot = projectRoot;
    this.filesystem = new FileSystemHandler();
}

AssetStructure.prototype.asset = function() {
    return this.filesystem.toOSStylePath(this.filesystem.concat(
        this.projectRoot,AssetStructure.ASSET));
};

AssetStructure.prototype.tileset = function() {
    return this.filesystem.toOSStylePath(this.filesystem.concat(
        this.projectRoot,
        this.filesystem.concat(AssetStructure.ASSET,AssetStructure.TILESET)));
};


AssetStructure.ASSET = "asset";
AssetStructure.TILESET = "tileset";