function AssetStructure(projectRoot) {
    this.projectRoot = projectRoot;
    this.filesystem = new FileSystemHandler();
}

AssetStructure.prototype.asset = function() {
    return this.filesystem.toOSStylePath(this.filesystem.concat(
        this.projectRoot,AssetStructure.ASSET));
};

AssetStructure.prototype.getPath = function(assetName) {
    return this.filesystem.toOSStylePath(this.filesystem.concat(
        this.projectRoot,
        this.filesystem.concat(AssetStructure.ASSET,assetName)));
};

AssetStructure.prototype.getProjectJSON = function() {
    return this.filesystem.toOSStylePath(this.filesystem.concat(
        this.projectRoot,"project.json"));
};

AssetStructure.getAssetNames = function() {

    var assetNames = [];

    assetNames.push(AssetStructure.ANIMATION);
    assetNames.push(AssetStructure.BACKGROUNDMUSIC);
    assetNames.push(AssetStructure.BATTLESPRITE);
    assetNames.push(AssetStructure.CHARACTER);
    assetNames.push(AssetStructure.JSON);
    assetNames.push(AssetStructure.OVERLAY);
    assetNames.push(AssetStructure.MAP);
    assetNames.push(AssetStructure.GAMEOVER);
    assetNames.push(AssetStructure.SCENEBACKGROUND);
    assetNames.push(AssetStructure.SCRIPT);
    assetNames.push(AssetStructure.SOUNDEFFECT);
    assetNames.push(AssetStructure.TILESET);
    assetNames.push(AssetStructure.TERRAIN);
    assetNames.push(AssetStructure.TITLE);
    assetNames.push(AssetStructure.UI);

    return assetNames;
};


/**
 ASSET,
 ANIMATION,
 BACKGROUNDMUSIC,
 BATTLEBACKGROUND,
 BATTLESPRITE,
 CHARACTER,
 JSON,
 OVERLAY,
 MAP,
 GAMEOVER,
 SCENEBACKGROUND,
 SCRIPT,
 SOUNDEFFECT,
 TILESET,
 TERRAIN,
 TITLE,
 UI
 */


AssetStructure.ASSET = "asset";
AssetStructure.ANIMATION = "animation";
AssetStructure.BACKGROUNDMUSIC = "bgm";
AssetStructure.BATTLEBACKGROUND = "battlebackground";
AssetStructure.BATTLESPRITE = "battlesprite";
AssetStructure.CHARACTER = "character";
AssetStructure.JSON = "json";
AssetStructure.OVERLAY  = "overlay";
AssetStructure.MAP = "map";
AssetStructure.GAMEOVER = "gameover";
AssetStructure.SCENEBACKGROUND = "scenebackground";
AssetStructure.SCRIPT = "script";
AssetStructure.SOUNDEFFECT = "soundeffect";
AssetStructure.TILESET = "tileset";
AssetStructure.TERRAIN = "terrain";
AssetStructure.TITLE = "title";
AssetStructure.UI = "ui";
