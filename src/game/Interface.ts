import {EIndicatorType, EDevKeywords, IExecuteTask, IIndicator} from "../define/GameDefine";
import {IGameMap} from "./map/Interface";

export interface IGameMain extends IIndicatorMaster {

    gameMap:IGameMap;
}

export let GameInstance:IGameMain;

//指标中心
export interface IIndicatorMaster {
    //注册管理
    registerHandle(type:EIndicatorType,handle:IIndicatorHandle):void;
    //执行指标
    execute(task:IExecuteTask):void;
    //更新框架
    updateFrame(timestamp:number):void;
}

//指标管理
export interface IIndicatorHandle {
    //指标类型
    type:EIndicatorType;
    //更新框架
    updateFrame(frameStamp:number):void;
    //执行指标
    execute(task:IExecuteTask):boolean;
    //终止指标
    terminal(params:IExecuteData):void;
    //描述指标
    describeIndicator(data:IIndicator):string;
    //描述运行
    describeData(data:IExecuteData):string;
}

//动态参数
export interface IIndicatorParams {
    [EDevKeywords.EXECUTOR]?:ITraceable;
    [EDevKeywords.TARGET]?:ITraceable;
}

//执行管理
export interface IExecuteHandle {
    //当前帧戳
    currentFrame:number;
    //创建运行数据
    create(indicator:IIndicator,...args):IExecuteData;
    //更新框架
    updateExecute(data:IExecuteData):IUpdateResult;
}

//执行数据
export interface IExecuteData extends IIndicatorParams {
    //到达帧戳
    reachFrame:number;
    //触发指标
    task:IExecuteTask;
}

//更新结果
export interface IUpdateResult {
    //回收标记
    isDying:boolean;
}

//溯源实体
export interface ITraceable {
    //实体标识
    id:number;
}