import {
    EBallisticTarget, IBulletUpdateResult, IPointBulletData, IPointTracingHandle,
    IPointTracingIndicator
} from "./Interface";
import {IMapPoint} from "../map/Interface";
import {EBallisticType} from "../../define/GameDefine";
import {GameInstance} from "../Interface";

class PointTracingHandle_P implements IPointTracingHandle {

    //当前帧戳
    currentFrame:number;
    //创建运行数据
    create(indicator:IPointTracingIndicator,startPoint:IMapPoint,targetPoint:IMapPoint):IPointBulletData {
        //类型指定
        let targetMode = EBallisticTarget.POINT;
        //起始帧戳
        let startFrame = this.currentFrame;
        //弹道模式
        let movingMode = EBallisticType.FIXED_DELAY;
        //每帧触发
        let frameTrigger = false;
        //当前位置
        let currentPoint:IMapPoint = startPoint;
        //获取距离
        let distance = GameInstance.gameMap.getDistance(startPoint,targetPoint);
        //获取时间
        let duration = Math.round(distance/indicator.speed);
        if(!duration) {
            duration = 1;
        }
        let reachFrame = startFrame + duration;
        let handle = this;
        return {startPoint,targetPoint,targetMode,startFrame,movingMode,frameTrigger,currentPoint,reachFrame,handle};
    }

    //更新框架
    updateExecute(data:IPointBulletData):IBulletUpdateResult {
        let reachedTarget = this.currentFrame >= data.reachFrame;
        let isDying = reachedTarget;
        return {isReached: reachedTarget,isDying};
    }
}

export const PointTracingHandle:{new():IPointTracingHandle} = PointTracingHandle_P;