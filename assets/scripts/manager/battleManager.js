var characterEntity = require("characterEntity");
cc.Class({
    init:function () {
        // console.log("---init battleManager---");
        
    },

    initBattle:function(){
        this.winSize = cc.director.getWinSize();

        this.mainEntity = new characterEntity();
        this.mainEntity.setEntityPos(1500, 1500);
        battle.visionManager.setVisionEntity(this.mainEntity);
    },

    getRandom:function(){
        return Math.random();
    },

    step:function(){
        
    },

    clear:function(){
        
    }
});
