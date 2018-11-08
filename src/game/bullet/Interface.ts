////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
//  行为的发生包含几个要素：1.发起者 2.目标 3.过程 4.影响
//  整个行为的过程包含：1.发起判定->2.创建弹道->3.影响判定->4.影响执行
////////////////////////////////////////////////////////////////////////////////

import {EBallisticType, EIndicatorType, IBallisticIndicator, IIndicator} from "../../define/GameDefine";
import {IMapPoint, ITraceableEntity} from "../map/Interface";
import {
    IExecuteData, IExecuteHandle, IIndicatorHandle, IIndicatorRecord,
    ITraceable, IUpdateResult
} from "../Interface";

//行为管理
export interface IBulletManager extends IIndicatorHandle {
    //类型指定
    type:EIndicatorType.BALLISTIC;

    //执行指标
    execute(params:IBallisticIndicator,executor:ITraceable):IBallisticRecord|string;
}

//地点追踪
export interface IPointTracingHandle extends IExecuteHandle {
    //创建运行数据
    create(indicator:IPointTracingIndicator,start:IMapPoint,target:IMapPoint):IPointBulletData;
    //更新框架
    updateExecute(data:IPointBulletData):IBulletUpdateResult;
}

//目标追踪
export interface IMoveTracingHandle extends IExecuteHandle {
    //创建运行数据
    create(indicator:IMoveTracingIndicator,start:IMapPoint,target:ITraceableEntity):IBulletData;
    //更新框架
    updateExecute(data:IBulletData):IBulletUpdateResult;
}

//更新结果
export interface IBulletUpdateResult extends IUpdateResult {
    //捕获目标
    reachedTarget:boolean;
}

//地点追踪
export interface IPointTracingIndicator extends IBallisticIndicator {
    //指定类型
    ballisticType:EBallisticType.FIXED_DELAY;
    //移动速度
    speed:number;
}

//追踪弹道
export interface IMoveTracingIndicator extends IBallisticIndicator {
    //指定类型
    ballisticType:EBallisticType.MOVE_TRACKING;
    //追踪对象
    targetID:number;
}

//弹道记录
export interface IBallisticRecord extends IIndicatorRecord {
    //指标
    indicator:IBallisticIndicator;
    //数据
    data:IBulletData;
}

//弹道数据
export interface IBulletData extends IExecuteData {
    //弹道模式
    movingMode:EBallisticType;
    //每帧触发
    frameTrigger:boolean;
    //当前位置
    currentPoint:IMapPoint;
    //目标类型
    targetMode:EBallisticTarget;
}

//定点弹道
export interface IPointBulletData extends IBulletData {
    //类型指定
    targetMode:EBallisticTarget.POINT;
    //地点指定
    targetPoint:IMapPoint;
    //起始指定
    startPoint:IMapPoint;
    //起始帧戳
    startFrame:number;
}

//移动弹道
export interface IMoveBulletData extends IPointBulletData {

}

//目标类型
export enum EBallisticTarget {
    POINT,          //地图点
    DIRECTION,      //方向
    ENTITY          //实体
}