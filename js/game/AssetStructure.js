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

AssetStructure.getAssetNames = function() {

    var assetNames = [];

    assetNames.push(AssetStructure.ANIMATION);
    assetNames.push(AssetStructure.BACKGROUNDMUSIC);
    assetNames.push(AssetStructure.BATTLESPRITE);
    assetNames.push(AssetStructure.CHARACTER);
    assetNames.push(AssetStructure.OVERLAY);
    assetNames.push(AssetStructure.MAP);
    assetNames.push(AssetStructure.GAMEOVER);
    assetNames.push(AssetStructure.SCENEBACKGROUND);
    assetNames.push(AssetStructure.SCRIPT);
    assetNames.push(AssetStructure.SOUNDEFFECT);
    assetNames.push(AssetStructure.TILESET);
    assetNames.push(AssetStructure.TERRAIN);
    assetNames.push(AssetStructure.TITLE);
    assetNames.push(AssetStructure.TERRAIN);
    assetNames.push(AssetStructure.TITLE);
    assetNames.push(AssetStructure.UI);
    assetNames.push(AssetStructure.XML);

    return assetNames;
};


/**
 ASSET,
 ANIMATION,
 BACKGROUNDMUSIC,
 BATTLEBACKGROUND,
 BATTLESPRITE,
 CHARACTER,
 OVERLAY,
 MAP,
 GAMEOVER,
 SCENEBACKGROUND,
 SCRIPT,
 SOUNDEFFECT,
 TILESET,
 TERRAIN,
 TITLE,
 UI,
 XML
 */


AssetStructure.ASSET = "asset";
AssetStructure.ANIMATION = "animation";
AssetStructure.BACKGROUNDMUSIC = "bgm";
AssetStructure.BATTLEBACKGROUND = "battlebackground";
AssetStructure.BATTLESPRITE = "battlesprite";
AssetStructure.CHARACTER = "character";
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
AssetStructure.XML = "xml";