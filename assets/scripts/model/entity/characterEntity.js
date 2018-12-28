var baseEntity = require("baseEntity");
cc.Class({
    extends:baseEntity,

    init:function(){
        this._super();
        this.initParams();
        this.initEntity();
    },

    initParams:function(){
        this.entityType = gameConst.ENTITY_TYPE.CHARACTER;
        this.nowEntityPos = cc.p(0, 0);
        this.canOperate = true;
        this.allBuffs = {};
        this.allBuffsKey = [];
        this.buffI = 0;
        this.moveSpeed = 5;
        this.isMove = false;
        this.nowAction = "";
        this.nowDirect = 1;
    },

    initEntity:function(){
        this.useEntity = cc.instantiate(cc.loader.getRes("prefabs/base/character_prefab"));
        this.useEntity.parent = battle.layerManager.playerLayer;

        this.useCollisionDisplay = this.useEntity.getChildByName("collision_display").getComponent(cc.CircleCollider);
        if(this.useCollisionDisplay){
            this.useRadius = this.useCollisionDisplay.radius;
            this.useCollisionDisplay.host = this;
        }

        this.charArmatureDisplay = this.useEntity.getChildByName("dragon_display").getComponent(dragonBones.ArmatureDisplay);
        if(this.charArmatureDisplay){
            this.charArmature = this.charArmatureDisplay.armature();
            // this.charArmature.getSlot('tou').childArmature.animation.gotoAndStop("type2");
            this.charArmatureDisplay.node.active = false;
        }

        this.mountsArmatureDisplay = this.useEntity.getChildByName("mounts_display").getComponent(dragonBones.ArmatureDisplay);
        if(this.mountsArmatureDisplay){
            this.mountsHostArmature = this.charArmatureDisplay.buildArmature("sunwukong");
            this.mountsHostArmature.animation.play(gameConst.ACTION.RIDE);
            // this.mountsHostArmature.getSlot('tou').childArmature.animation.gotoAndStop("type2");
            this.mountsArmature = this.mountsArmatureDisplay.armature();
            this.mountsArmature.getSlot('yingxiong').childArmature = this.mountsHostArmature;
        }

        this.useArmature = this.mountsArmature;
        this.useArmatureDisplay = this.mountsArmatureDisplay;
        this.onRide = true;
    },

    setAction:function(action){
        if(this.nowAction != action){
            this.nowAction = action;
            if(this.useArmature){
                this.useArmature.animation.play(action);
                if(this.onRide){
                    this.mountsHostArmature.animation.play(gameConst.ACTION.RIDE);
                }
            }
        }
    },

    setDirect:function(direct){
        if(this.nowDirect != direct){
            this.nowDirect = direct;
            if(this.useArmatureDisplay){
                this.useArmatureDisplay.node.scaleX = this.nowDirect;
            }
        }
    },

    addBuff:function(type, time){
        if(!this.allBuffs[type]){
            var nowBuff = require(type);
            this.allBuffs[type] = new nowBuff();
            this.allBuffsKey = Object.keys(this.allBuffs);
        }
        this.allBuffs[type].init(this, time);
    },

    removeBuff:function(type){
        if(this.allBuffs[type]){
            delete this.allBuffs[type];
            this.allBuffsKey = Object.keys(this.allBuffs);
        }
    },

    onCollisionEnter:function(other){
        console.log("enter");
    },

    onCollisionStay:function(other){
        console.log("stay");
    },

    onCollisionExit:function(other){
        console.log("exit");
    },

    startMove:function(touchPos, moveAngle){
        this.isMove = true;
        this.touchPos = touchPos;
        this.moveAngle = moveAngle;
        this.setAction(gameConst.ACTION.RUN);
    },

    endMove:function(){
        this.isMove = false;
        this.setAction(gameConst.ACTION.IDLE);
    },

    setEntityPos:function(xPos, yPos){
        if(xPos < 50){
            xPos = 50;
        }else if(xPos > battle.tiledManager.tiledMapSize.width - 50){
            xPos = battle.tiledManager.tiledMapSize.width - 50;
        }
        if(yPos < 0){
            yPos = 0;
        }else if(yPos > battle.tiledManager.tiledMapSize.height - 100){
            yPos = battle.tiledManager.tiledMapSize.height - 100;
        }
        this.nowEntityPos.x = xPos;
        this.nowEntityPos.y = yPos;
        this.useEntity.x = xPos;
        this.useEntity.y = yPos;
    },

    setEntityPosX:function(xPos){
        this.nowEntityPos.x = xPos;
        this.useEntity.x = xPos;
    },

    setEntityPosY:function(yPos){
        this.nowEntityPos.y = yPos;
        this.useEntity.y = yPos;
    },

    step:function(){
        this._super();
        this.moveStep();
        this.buffStep();
    },

    moveStep:function(){
        if(this.isMove){
            if(this.touchPos.x < 0){
                this.setDirect(gameConst.DIRECT.LEFT);
                this.setEntityPos(this.nowEntityPos.x - Math.cos(this.moveAngle) * this.moveSpeed, this.nowEntityPos.y - Math.sin(this.moveAngle) * this.moveSpeed);
            }else{
                this.setDirect(gameConst.DIRECT.RIGHT);
                this.setEntityPos(this.nowEntityPos.x + Math.cos(this.moveAngle) * this.moveSpeed, this.nowEntityPos.y + Math.sin(this.moveAngle) * this.moveSpeed);
            }
        }
    },

    buffStep:function(){
        for(this.buffI = this.allBuffsKey.length - 1; this.buffI >= 0; this.buffI--){
            if(this.allBuffsKey[this.buffI] && this.allBuffs[this.allBuffsKey[this.buffI]]){
                this.allBuffs[this.allBuffsKey[this.buffI]].step();
            }
        }
    },

    clear:function(){
        this._super();
    }
});
