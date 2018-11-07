////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

import {EInfectionType, IInfectionIndicator} from "../../define/GameDefine";
import {IExecuteData, IIndicatorHandle, IIndicatorRecord, ITraceable} from "../Interface";

/**
 * 影响管理器
 */
export interface IInfectionHandle extends IIndicatorHandle {
    //执行指标
    execute(params:IInfectionIndicator,executor?:ITraceable):IInfectionRecord|string;
    //描述指标
    describeIndicator(data:IInfectionIndicator):string;
    //描述运行
    describeData(data:IInfectionData):string;
}

//影响数据
export interface IInfectionData extends IExecuteData {
    //直接释放者
    directExecutor:any;
    //源头释放者
    originExecutor:any;
}

export interface IInfectionRecord extends IIndicatorRecord {

}