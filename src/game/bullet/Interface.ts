////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
//  行为的发生包含几个要素：1.发起者 2.目标 3.过程 4.影响
//  整个行为的过程包含：1.发起判定->2.创建弹道->3.影响判定->4.影响执行
////////////////////////////////////////////////////////////////////////////////

import {EBallisticType, EIndicatorType, EParamKeywords, IBallisticIndicator, IIndicator} from "../../define/GameDefine";
import {IMapPoint, ITraceableEntity} from "../map/Interface";
import {
    IExecuteData, IExecuteHandle, IIndicatorHandle, ITraceable, IUpdateResult
} from "../Interface";

//行为管理
export interface IBulletManager extends IIndicatorHandle {
    //类型指定
    type:EIndicatorType.BALLISTIC;

    //执行指标
    execute(indicator:IBallisticIndicator,param:IIndicatorParams):void;
}

//动态参数
export interface IIndicatorParams {
    [EParamKeywords.TARGET_ENTITY]?:ITraceableEntity;
    [EParamKeywords.EXECUTOR_ENTITY]?:ITraceableEntity;
    [EParamKeywords.TARGET_POINT]?:IMapPoint;
    [EParamKeywords.EXECUTOR_POINT]?:IMapPoint;
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
    create(indicator:IMoveTracingIndicator,start:IMapPoint,target:ITraceableEntity):IMoveBulletData;
    //更新框架
    updateExecute(data:IMoveBulletData):IBulletUpdateResult;
}

//更新结果
export interface IBulletUpdateResult extends IUpdateResult {
    //捕获目标
    isReached:boolean;
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
    //追踪速度
    speed:number;
}

//弹道数据
export interface IBulletData extends IExecuteData,IIndicatorParams {
    //执行位置
    [EParamKeywords.EXECUTOR_POINT]:IMapPoint;
    //弹道模式
    movingMode:EBallisticType;
    //每帧触发
    frameTrigger:boolean;
    //目标类型
    targetMode:EBallisticTarget;
    //处理器
    handle:IExecuteHandle;
}

//定点弹道
export interface IPointBulletData extends IBulletData {
    //类型指定
    targetMode:EBallisticTarget.POINT;
    //地点指定
    [EParamKeywords.TARGET_POINT]:IMapPoint;
    //起始帧戳
    startFrame:number;

    handle:IPointTracingHandle;
}

//移动弹道
export interface IMoveBulletData extends IBulletData {
    //类型指定
    targetMode:EBallisticTarget.ENTITY;
    //跟踪目标
    [EParamKeywords.TARGET_ENTITY]:ITraceableEntity;
    //起始帧戳
    startFrame:number;
    //当前速度
    currentSpeed:number;
    //当前位置
    currentPoint:IMapPoint;

    handle:IMoveTracingHandle;
}

//目标类型
export enum EBallisticTarget {
    POINT,          //地图点
    DIRECTION,      //方向
    ENTITY          //实体
}