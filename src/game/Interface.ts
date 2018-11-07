import {IClock} from "../time/IClock";
import {RandomUtils} from "../utils/RandomUtils";
import {IGameMap} from "./map/Interface";
import {IActionManager} from "./action/Interface";
import {IInfectionManager} from "./infection/Interface";
import {IBuffManager} from "./buff/Interface";
import {EIndicatorType, IIndicator} from "../define/GameDefine";

//游戏实例
export interface IGameMain {
    //游戏地图
    gameMap:IGameMap;
    //动画时钟
    animeClock:IClock;
    //逻辑时钟
    logicClock:IClock;
    //共享随机
    sharedRand:RandomUtils;
    //行为管理
    actionManager:IActionManager;
    //影响管理
    infectionManager:IInfectionManager;
    //buff管理
    buffManager:IBuffManager;
}

//指标中心
export interface IIndicatorMaster {
    //注册管理
    registerHandle(type:EIndicatorType,handle:IIndicatorHandle):void;
    //执行指标
    execute(params:IIndicator,executor:ITraceable):IIndicatorRecord|string;
}

//指标管理
export interface IIndicatorHandle {
    //指标类型
    type:EIndicatorType;
    //执行指标
    execute(params:IIndicator,executor?:ITraceable):IIndicatorRecord|string;
    //描述指标
    describeIndicator(data:IIndicator):string;
    //描述运行
    describeData(data:IExecuteData):string;
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