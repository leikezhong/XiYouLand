cc.Class({
    init:function () {
        // console.log("---init collisionManager---");
        
    },

    initCollision:function(camera){
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
        cc.director.getCollisionManager().attachDebugDrawToCamera(camera.getComponent(cc.Camera));
    },

    step:function(){

    },

    clear:function(){
        
    }
});
