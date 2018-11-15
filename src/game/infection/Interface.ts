////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

import {IExecuteTask, IInfectionIndicator} from "../../define/GameDefine";
import {IExecuteData, IIndicatorHandle} from "../Interface";

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