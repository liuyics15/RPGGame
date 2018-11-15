import {
    IBulletData,
    IBulletManager, IBulletTask,
    IBulletUpdateResult,
    IIndicatorParams,
    IMoveTracingHandle,
    IMoveTracingIndicator,
    IPointTracingHandle,
    IPointTracingIndicator
} from "./Interface";
import {EBallisticType, EIndicatorType, EDevKeywords, IBallisticIndicator, IIndicator} from "../../define/GameDefine";
import {GameInstance, IExecuteData} from "../Interface";
import {PointTracingHandle} from "./PointTracingHandle";
import {MoveTracingHandle} from "./MoveTracingHandle";

export class BulletManager implements IBulletManager {

    //当前帧戳
    currentFrame:number;

    //类型指定
    readonly type:EIndicatorType.BALLISTIC;

    //~handles
    private _pointHandle:IPointTracingHandle;
    private _moveHandle:IMoveTracingHandle;

    private readonly _frameSchedule:{[frameStamp:number]:IBulletData[]};
    private readonly _beatingDataVec:IBulletData[];

    constructor() {
        this.type = EIndicatorType.BALLISTIC;
        this._pointHandle = new PointTracingHandle();
        this._moveHandle = new MoveTracingHandle();
        this._frameSchedule = {};
        this._beatingDataVec = [];
    }

    //更新框架
    updateFrame(frameStamp:number):void {
        this.currentFrame = frameStamp;
        this._pointHandle.currentFrame = frameStamp;
        this._moveHandle.currentFrame = frameStamp;
        this._beatingDataVec.forEach(bullet => {
            bullet.handle.updateExecute(bullet);
        });
        let currentSchedule = this._frameSchedule[frameStamp];
        if (currentSchedule) {
            let totalSchedules = currentSchedule.length;
            for(let i = totalSchedules - 1;i >= 0; i--) {
                let bullet = currentSchedule[i];
                let result = <IBulletUpdateResult>bullet.handle.updateExecute(bullet);
                if (result.isReached) {
                    this.triggerBullet(bullet);
                }
                else if (result.isDying) {
                    this.removeBullet(bullet);
                }
            }
        }
    }

    //执行指标
    execute(task:IBulletTask):boolean {
        let indicator = task.currentIndicator;
        let type = indicator.ballisticType;
        let param = task.paramBoard;
        let bullet:IBulletData;
        switch (type) {
            case EBallisticType.FIXED_DELAY:
                if (param[EDevKeywords.EXECUTOR_POINT] && param[EDevKeywords.TARGET_POINT]) {
                    bullet = this._pointHandle.create(<IPointTracingIndicator>indicator,param[EDevKeywords.EXECUTOR_POINT], param[EDevKeywords.TARGET_POINT]);
                }
                break;
            case EBallisticType.MOVE_TRACKING:
                if (param[EDevKeywords.EXECUTOR_POINT] && param[EDevKeywords.TARGET_ENTITY]) {
                    bullet = this._moveHandle.create(<IMoveTracingIndicator>indicator,param[EDevKeywords.EXECUTOR_POINT],param[EDevKeywords.TARGET_ENTITY]);
                }
                break;
            default:
                console.warn("没有该类型的执行器实现");
        }
        if (bullet) {
            bullet.task = task;
            if (bullet.frameTrigger) {
                this._beatingDataVec.push(bullet);
            }
            else {
                this.addSchedule(bullet.reachFrame,bullet);
            }
            return true;
        }
        else {
            return false;
        }
    }

    //终止指标
    terminal(bullet:IBulletData):void {
        if (bullet.frameTrigger) {
            this.removeFrameTrigger(bullet);
        }
        else {
            this.removeSchedule(bullet.reachFrame,bullet);
        }
    }

    //描述指标
    describeIndicator(data:IIndicator):string {
        return '';
    }

    //描述运行
    describeData(data:IExecuteData):string {
        return '';
    }

    //子触弹发
    private triggerBullet(data:IBulletData):void {
        this.removeBullet(data);
        if (data.task) {
            data.task.currentIndex ++;
            GameInstance.execute(data.task);
        }
    }

    //子弹移除
    private removeBullet(data:IBulletData):void {
        if (data.frameTrigger) {
            this.removeFrameTrigger(data);
        }
        else {
            this.removeSchedule(data.reachFrame,data);
        }
    }

    //添加时间表
    private addSchedule(frameStamp:number,data:IBulletData):void {
        let tasks = this._frameSchedule[frameStamp];
        if(!tasks) {
            tasks = this._frameSchedule[frameStamp] = [];
        }
        tasks.push(data);
    }

    //移除计划
    private removeSchedule(frameStamp:number,data:IBulletData):void {
        let schedule = this._frameSchedule[frameStamp];
        if (schedule) {
            let bulletIndex = schedule.indexOf(data);
            if (bulletIndex >= 0) {
                schedule.splice(bulletIndex,1);
            }
        }
    }

    //
    private removeFrameTrigger(data:IBulletData):void {
        let bulletIndex = this._beatingDataVec.indexOf(data);
        if (bulletIndex >= 0) {
            this._beatingDataVec.splice(bulletIndex,1);
        }
    }
}