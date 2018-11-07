import {EIndicatorType, IIndicator} from "../define/GameDefine";


//指标中心
export interface IIndicatorMaster {
    //注册管理
    registerHandle(type:EIndicatorType,handle:IIndicatorHandle):void;
    //执行指标
    execute(params:IIndicator,executor:ITraceable):IIndicatorRecord|string;
    //更新框架
    updateFrame(timestamp:number):void;
    //执行源头
    trackExecutor(record:IIndicatorRecord):ITraceable;
}

//指标管理
export interface IIndicatorHandle {
    //指标类型
    type:EIndicatorType;
    //更新框架
    updateFrame(timestamp:number):void;
    //执行指标
    execute(params:IIndicator,executor?:ITraceable):IIndicatorRecord|string;
    //描述指标
    describeIndicator(data:IIndicator):string;
    //描述运行
    describeData(data:IExecuteData):string;
}

//动态参数
export interface IDynamicArgs {

}

//执行数据
export interface IExecuteData {

}

//指标记录
export interface IIndicatorRecord {
    //指标数据
    indicator:IIndicator;
    //执行数据
    data:IExecuteData;
    //父级节点
    parent:IIndicatorRecord|ITraceable;
}

//溯源实体
export interface ITraceable {
    //实体标识
    id:number;
}