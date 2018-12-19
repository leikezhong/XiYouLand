cc.Class({
    init:function () {
        // console.log("---init uiManager---");
        
    },

    initUI:function(uiLayer){
        this.uiLayer = uiLayer;

        this.moveControl = this.uiLayer.getChildByName("moveControl");

        this.moveControl.on(cc.Node.EventType.TOUCH_START, this.startMoveFunc, this);
        this.moveControl.on(cc.Node.EventType.TOUCH_MOVE, this.startMoveFunc, this);
        this.moveControl.on(cc.Node.EventType.TOUCH_END, this.endMoveFunc, this);
        this.moveControl.on(cc.Node.EventType.TOUCH_CANCEL, this.endMoveFunc, this);

        this.rangeSp = this.moveControl.getChildByName("range");
        this.moveSp = this.moveControl.getChildByName("move");
        this.rangeLen = 120;
        this.moveAngle = 0;
    },

    startMoveFunc:function(event){
        this.touchPos = this.moveControl.convertToNodeSpaceAR(event.touch.getLocation());
        this.touchLen = this.touchPos.mag();
        if(this.touchLen > this.rangeLen){
            this.touchPos.x = this.rangeLen / this.touchLen * this.touchPos.x;
            this.touchPos.y = this.rangeLen / this.touchLen * this.touchPos.y;
        }
        this.moveSp.position = this.touchPos;
        this.moveAngle = Math.atan(this.touchPos.y / this.touchPos.x);
        if(battle.battleManager.mainEntity){
            battle.battleManager.mainEntity.startMove(this.touchPos, this.moveAngle);
        }
    },

    endMoveFunc:function(event){
        this.moveSp.position = cc.Vec2.ZERO;
        if(battle.battleManager.mainEntity){
            battle.battleManager.mainEntity.endMove();
        }
    },

    clear:function(){
        
    }
});
