cc.Class({
    init:function () {
        // console.log("---init visionManager---");
        this.visionEntity = null;
        this.cameraPos = cc.v2(0, 0);
    },

    initVision:function(camera){
        this.camera = camera;
        this.cameraNode = camera.getComponent(cc.Camera);
        this.cameraWid = (battle.battleManager.winSize.width/this.cameraNode.zoomRatio - battle.battleManager.winSize.width) * .5;
        this.cameraHei = (battle.battleManager.winSize.height/this.cameraNode.zoomRatio - battle.battleManager.winSize.height) * .5;
    },

    setVisionEntity:function(entity){
        this.visionEntity = entity;
    },

    step:function(){
        if(this.visionEntity){
            this.cameraPos = this.camera.parent.convertToNodeSpaceAR(this.visionEntity.nowEntityPos);
            if(this.cameraPos.x < 0){
                this.cameraPos.x = 0;
            }else if(this.cameraPos.x > battle.tiledManager.tiledMapSize.width - battle.battleManager.winSize.width){
                this.cameraPos.x = battle.tiledManager.tiledMapSize.width - battle.battleManager.winSize.width;
            }
            if(this.cameraPos.y < 0){
               this.cameraPos.y = 0; 
            }else if(this.cameraPos.y > battle.tiledManager.tiledMapSize.height - battle.battleManager.winSize.height){
                this.cameraPos.y = battle.tiledManager.tiledMapSize.height - battle.battleManager.winSize.height;
            }
        }
        if(this.cameraPos && battle.battleManager.winSize){
            //视野移动
            this.camera.position = this.cameraPos;
        }
    },

    clear:function(){
        this.visionChar = null;
    }
});
