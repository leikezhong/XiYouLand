cc.Class({
    init:function () {
        // console.log("---init tiledManager---");
        
    },

    initTiled:function(){
        this.tiledMap = cc.instantiate(cc.loader.getRes("prefabs/map/map_test"));
        this.tiledMap.parent = battle.layerManager.bgLayer;
        this.tiledMapInfo = this.tiledMap.getComponent(cc.TiledMap);
        this.tiledMapMapSize = this.tiledMapInfo.getMapSize();
        this.tiledMapTileSize = this.tiledMapInfo.getTileSize();
        this.tiledMapSize = new cc.Size(this.tiledMapMapSize.width * this.tiledMapTileSize.width, this.tiledMapMapSize.height * this.tiledMapTileSize.height);
        console.log("tiled map size:" + this.tiledMapSize);
    },

    clear:function(){
        
    }
});
