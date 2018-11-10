import {
    IBallisticRecord, IBulletData,
    IBulletManager,
    IMoveTracingHandle, IMoveTracingIndicator,
    IPointTracingHandle,
    IPointTracingIndicator
} from "./Interface";
import {EBallisticType, EIndicatorType, IBallisticIndicator, IIndicator} from "../../define/GameDefine";
import {IExecuteData, IIndicatorRecord, ITraceable} from "../Interface";
import {PointTracingHandle} from "./PointTracingHandle";
import {MoveTracingHandle} from "./MoveTracingHandle";
import {ITraceableEntity} from "../map/Interface";

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
        if (currentSchedule && currentSchedule.length) {
            currentSchedule.forEach(bullet => {
                bullet.handle.updateExecute(bullet);
            })
        }
    }

    //执行指标
    execute(params:IBallisticIndicator,executor:ITraceableEntity,taker?:ITraceableEntity):IBallisticRecord|string {
        let type = params.ballisticType;
        let record:IBallisticRecord = {
            indicator:params,
            data:null,
            parent:null
        };
        let bullet:IBulletData;
        switch (type) {
            case EBallisticType.FIXED_DELAY:
                bullet = this._pointHandle.create(<IPointTracingIndicator>params,executor.currentPoint,taker.currentPoint);
                break;
            case EBallisticType.MOVE_TRACKING:
                bullet = this._moveHandle.create(<IMoveTracingIndicator>params,executor.currentPoint,taker);
                break;
            default:
                return "没有该类型的执行器实现";
        }
        if (bullet) {
            record.data = bullet;
            if (bullet.frameTrigger) {
                this._beatingDataVec.push(bullet);
            }
            else {
                this.addSchedule(bullet.reachFrame,bullet);
            }
            return record;
        }
    }

    //终止指标
    terminal(params:IIndicatorRecord):void {
        let bullet = <IBulletData>params.data;
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