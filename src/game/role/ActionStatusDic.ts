import {KeyPropertyDic} from "../property/KeyPropertyDic";
import {IKeyPropertyHandle, IKeyPropertyLock} from "../property/Interface";
import {EEntityAction, EEntityStatus} from "../../define/GameDefine";

//行动状态
export interface IActionStatusDic {
    //是否允许行为
    isAllowed(action:EEntityAction):boolean;
    //设置是否允许
    setActionAllowed(action:EEntityAction,value:boolean,setter:IKeyPropertyHandle):void;
    //锁住行动状态
    lockAction(action:EEntityAction,setter:IKeyPropertyLock):void;
    //解锁
    unlockAction(action:EEntityAction,setter:IKeyPropertyLock):void;
}

class ActionStatusDic_P extends KeyPropertyDic implements IActionStatusDic {

    constructor() {
        super();

        this.registerProperty(EEntityAction.MOVE,true);
        this.registerProperty(EEntityAction.ATTACK,true);
        this.registerProperty(EEntityAction.DEFEND,true);
        this.registerProperty(EEntityAction.SPELL,true);
        this.registerProperty(EEntityAction.USE_ITEM,true);
    }

    //是否允许行为
    isAllowed(action:EEntityAction):boolean {
        return this.getProperty(action);
    }
    //设置是否允许
    setActionAllowed(action:EEntityAction,value:boolean,setter:IKeyPropertyHandle):void {
        this.setProperty(action,value,setter);
    }
    //锁住行动状态
    lockAction(action:EEntityAction,setter:IKeyPropertyLock):void {
        this.lockProperty(action,setter);
    }
    //解锁
    unlockAction(action:EEntityAction,setter:IKeyPropertyLock):void {
        this.unlockProperty(action,setter);
    }
}

export const ActionStatusDic:{new():IActionStatusDic} = ActionStatusDic_P;