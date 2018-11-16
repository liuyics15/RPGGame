////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

import {EInfectionType, EPropertyKey, IExecuteTask, IInfectionIndicator} from "../../define/GameDefine";
import {IExecuteData, IIndicatorHandle} from "../Interface";
import {IPropertyValue} from "../property/Interface";

/**
 * 影响管理器
 */
export interface IInfectionHandle extends IIndicatorHandle {
    //执行指标
    execute(task:IInfectionTask):boolean;
    //终止指标
    terminal(params:IInfectionData):void;
}

//影响任务
export interface IInfectionTask extends IExecuteTask {
    //当前指标
    currentIndicator:IInfectionIndicator;
}

//影响数据
export interface IInfectionData extends IExecuteData {
    //直接释放者
    directExecutor:any;
    //源头释放者
    originExecutor:any;
}

//=======================================================================================
//属性影响
//=======================================================================================
export interface IPropertyInfectionIndicator extends IInfectionIndicator {
    //类型指定
    infectionType:EInfectionType.PROPERTY;
    //影响列表
    changeProperties:IPropertyChangeData[];
}

//属性设置
export interface IPropertyChangeData {
    //属性ID
    propertyID:EPropertyKey;
    //设置类型
    setType:EPropertyChangeType;
    //设置值
    setValue:IPropertyValue;
    //恢复延时
    recoverDelay:number;
}

//更改类型
export const enum EPropertyChangeType {
    SET,            //设置
    CHANGE,         //更改
    LOCK,           //加锁
}

//属性任务
export interface IPropertyInfectionTask extends IInfectionTask {
    //当前指标
    currentIndicator:IPropertyInfectionIndicator;
}

//任务执行
export interface IPropertyInfectionData extends IInfectionData {

}

//属性管理
export interface IPropertyInfectionHandle extends IInfectionHandle {
    //执行指标
    execute(task:IPropertyInfectionTask):boolean;
    //终止指标
    terminal(params:IInfectionData):void;
}