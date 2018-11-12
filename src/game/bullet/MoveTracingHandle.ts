import {EBallisticTarget, IBulletUpdateResult, IMoveBulletData, IMoveTracingHandle, IMoveTracingIndicator} from "./Interface";
import {IMapPoint, ITraceableEntity} from "../map/Interface";
import {EBallisticType} from "../../define/GameDefine";
import {GameInstance} from "../Interface";
import {numRound} from "../../GlobalFunc";

class MoveTracingHandle_P implements IMoveTracingHandle {

    currentFrame:number;

    //创建运行数据
    create(indicator:IMoveTracingIndicator,executorPoint:IMapPoint,targetEntity:ITraceableEntity):IMoveBulletData {
        //到达帧戳
        let reachFrame:number = null;
        //弹道模式
        let movingMode = EBallisticType.MOVE_TRACKING;
        //每帧触发
        let frameTrigger:boolean = true;
        //当前位置
        let currentPoint = executorPoint;
        //目标类型
        let targetMode = EBallisticTarget.ENTITY;
        //起始帧戳
        let startFrame:number = this.currentFrame;
        //当前速度
        let currentSpeed:number = indicator.speed;
        let handle = this;
        return {reachFrame,movingMode,frameTrigger,currentPoint, executorPoint,targetMode,startFrame,currentSpeed,targetEntity,handle};
    }

    //更新框架
    updateExecute(data:IMoveBulletData):IBulletUpdateResult {
        let targetPoint = data.targetEntity.currentPoint;
        let distance = GameInstance.gameMap.getDistance(data.currentPoint,targetPoint);
        if (distance < data.currentSpeed) {
            data.currentPoint = targetPoint;
            return {isDying:true,isReached:true};
        }
        else {
            let direction = GameInstance.gameMap.getDirection(data.currentPoint,targetPoint);
            let toPoint:IMapPoint = {
                x:numRound(data.currentPoint.x + direction.pointerX * data.currentSpeed,3),
                y:numRound(data.currentPoint.y + direction.pointerY * data.currentSpeed,3)
            };
            data.currentPoint = toPoint;
            return {isDying:false,isReached:false};
        }
    }
}

export const MoveTracingHandle:{new():IMoveTracingHandle} = MoveTracingHandle_P;