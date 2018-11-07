////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

import {EInfectionType} from "../../define/GameDefine";

/**
 * 影响管理器
 */
export interface IInfectionManager {
    //创建影响
    createInfection(taker:any,data:IInfectionIndicator):IInfectionData;
    //创建交互影响
    createInteractiveInfection(executor:any,taker:any,data:IInfectionIndicator):IInfectionData;
    //移除影响
    removeInfection(data:IInfectionData):void;
}

//影响指示
export interface IInfectionIndicator {
    //影响类型
    type:EInfectionType;
    //次级类型
    subType:number;
}

//影响数据
export interface IInfectionData {
    //直接释放者
    directExecutor:any;
    //源头释放者
    originExecutor:any;
}