////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

import {IInteractively} from "../Interface";

//游戏地图
export interface IGameMap extends IInteractively {

    readonly mapStartX:number;
    readonly mapStartY:number;
    readonly mapWidth:number;
    readonly mapHeight:number;

    setMapConf(data:ArrayBuffer):void;
    getAccess(from:IMapPoint,to:IMapPoint):IMapPoint[];
    isBlocked(point:IMapPoint):boolean;
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