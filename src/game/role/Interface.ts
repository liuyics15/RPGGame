////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

import {IActionSubject, ICMDSubject, IEventSubject} from "../IObserver";
import {IClockObserver} from "../../time/IClock";
import {IActionStatusDic} from "./ActionStatusDic";
import {IKeyPropertyDic} from "../property/Interface";
import {EEntityAction, EEntityStatus} from "../../define/GameDefine";

//实体
export interface IEntity extends ICMDSubject,IEventSubject,IActionSubject,IClockObserver {

    id:number;

    //当前状态
    currentStatus:EEntityStatus;
    //行动状态
    actionStatus:IActionStatusDic;
    //关键属性
    keyProperty:IKeyPropertyDic;

    //执行行为
    executeAction(action:EEntityAction,...args):boolean;
    //被动行为
    passiveAction(action:EEntityAction,...args):void;

    //回收或销毁
    dispose():void;
}

//角色管理
export interface IRoleManager {
    //获取角色
    getEntity(id:number):IEntity;
    //添加角色
    addEntity(entity:IEntity):void;
    //移除角色
    removeEntity(id:number):void;
    removeEntity(entity:IEntity):void;
}