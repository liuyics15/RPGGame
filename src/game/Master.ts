import {IIndicatorHandle, IIndicatorMaster, ITraceable} from "./Interface";
import {EIndicatorType, IExecuteTask, IIndicator} from "../define/GameDefine";
import {DEV_LOG} from "../debug/Interface";

export class IndicatorMaster implements IIndicatorMaster {

    private _handleDic:{[type:number]:IIndicatorHandle} = [];
    private _handleVec:IIndicatorHandle[] = [];

    //注册管理
    registerHandle(type:EIndicatorType,handle:IIndicatorHandle):void {
        this._handleDic[type] = handle;
        this._handleVec.push(handle);
    }
    //执行指标
    execute(task:IExecuteTask):void {
        //收集参数
        if (task.currentData && task.currentIndicator) {
            let collectKeys = task.currentIndicator.collectParams;
            if (collectKeys && collectKeys.length) {
                collectKeys.forEach(collectKey => {
                    let collectValue = task.currentData[collectKey];
                    if (collectValue) {
                        task.paramBoard[collectKey] = collectValue;
                    }
                    else {
                        DEV_LOG.warn("收集的参数在运行数据中不存在");
                    }
                });
            }
        }
        //下一指标
        if (task.currentIndex < task.indicators.length) {
            task.currentIndicator = task.indicators[task.currentIndex];
            delete task.currentData;
            let taskHandle = this._handleDic[task.currentIndicator.type];
            if (taskHandle) {
                taskHandle.execute(task);
            }
            else {
                DEV_LOG.warn("指标控制器不存在："+task.currentIndicator.type);
            }
        }
        //task over
    }
    //更新框架
    updateFrame(timestamp:number):void {
        this._handleVec.forEach(handle => handle.updateFrame(timestamp));
    }
}