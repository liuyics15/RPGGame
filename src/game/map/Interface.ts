////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

//游戏地图
import {ITraceable} from "../Interface";

export interface IGameMap {

    readonly mapStartX:number;
    readonly mapStartY:number;
    readonly mapWidth:number;
    readonly mapHeight:number;

    //设置地图
    setMapConf(data:ArrayBuffer):void;

    //获取路径
    getPath(from:IMapPoint,to:IMapPoint):IMapPoint[];
    //获取路径
    getDistance(a:IMapPoint,b:IMapPoint):number;
    //获取方向
    getDirection(from:IMapPoint,to:IMapPoint):IDirection;
    //阻点判断
    isBlocked(point:IMapPoint):boolean;

    //添加实体
    addMapEntity(entity:ITraceableEntity, point:IMapPoint):void;
    //移除实体
    removeMapEntity(entity:ITraceableEntity):void;

    //获取实体
    getMapEntity(point:IMapPoint):ITraceableEntity|undefined;
}

//地图点
export interface IMapPoint {
    x:number;
    y:number;
}

//方向
export interface IDirection {
    pointerX:number;
    pointerY:number;
}


//可追踪实体
export interface ITraceableEntity extends ITraceable {
    //当前位置
    currentPoint:IMapPoint;
    //当前方向
    currentDirection:IDirection;
}