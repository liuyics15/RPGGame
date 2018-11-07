////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
//  行为的发生包含几个要素：1.发起者 2.目标 3.过程 4.影响
//  整个行为的过程包含：1.发起判定->2.创建弹道->3.影响判定->4.影响执行
////////////////////////////////////////////////////////////////////////////////

import {EBulletTrace, EEntityAction, EEntityStatus, EInfectionType} from "../../define/GameDefine";
import {IKeyPropertyDic} from "../property/Interface";
import {IActionIndicator} from "./ActionIndicator";
import {IMapPoint} from "../map/Interface";
import {RandomUtils} from "../../utils/RandomUtils";
import {IInfectionIndicator} from "../infection/Interface";

//行为管理
export interface IActionManager extends IBulletManager {
    /**
     * 开始行为
     * @param executor 执行人
     * @param action 行为
     * @param target 目标
     */
    startAction(executor:IActionEntity,action:EEntityAction,target:any):IEntityAction|undefined;
    /**
     * 开始攻击行为
     * @param executor 发起人
     * @param action 攻击
     * @param taker 攻击对象
     */
    startAction(executor:IActionEntity,action:EEntityAction.ATTACK,taker:IActionEntity):IEntityAction|undefined;

    /**
     * 撤销执行人当前行为
     * @param executor
     */
    cancelActions(executor:IActionEntity):void;
}

export interface IBulletManager {
    //随机池
    logicRand:RandomUtils;

    //创建弹道
    createBullet(action:IEntityAction,onTrigger:()=>void,onFailure:()=>void):IBulletData;
    //移除弹道
    removeBullet(bullet:IBulletData):void;
}

//动作指标
export interface IActionIndicator {
    //行为类型
    type:EEntityAction;
    //区分ID
    id:number;

    actions:{
        //动画ID
        actionID:number;
        //持续时间
        duration:number;

        willTrigger:IInfectionIndicator;
        // //是否可撤销 由代码自定义
        // cancelable:boolean;
    }[];
}

export interface ITriggerTask {

}

//弹道数据
export interface IBulletData {
    //弹道模式
    movingMode:EBulletTrace;
    //目标类型
    targetMode:EBallisticTarget;
    //允许丢失
    acceptMiss:boolean;
}

//目标类型
export enum EBallisticTarget {
    POINT,          //地图点
    DIRECTION,      //方向
    ENTITY          //实体
}

//行为对象
export interface IActionEntity {

    //当前状态
    currentStatus:EEntityStatus;
    //当前行为
    currentAction:EEntityAction;
    //行动状态
    actionStatus:IActionIndicator;
    //关键属性
    keyProperty:IKeyPropertyDic;

    //地图位置
    mapPosition:IMapPoint;

    /**
     * 执行动作：仅作用于内部
     */
    onExecuteAction(action:EEntityAction,...args):void;

    /**
     * 被动行为：仅作用于内部
     */
    onPassiveAction(action:EEntityAction,...args):void;
}

//实体行为
export interface IEntityAction {
    //行为类型
    type:EEntityAction;
    //发起者
    executor:IActionEntity;
    //目标
    target:any;
    //状态
    status:EActionStatus;
    //是否可撤销
    cancelable:boolean;
}

//行为状态
export enum EActionStatus {
    ACTION,     //角色动作中
    BALLISTIC,  //在弹道
    TRIGGER,    //触发
    INFECTION   //执行影响
}