import {IBulletUpdateResult, IMoveBulletData, IMoveTracingHandle, IMoveTracingIndicator} from "./Interface";
import {IMapPoint, ITraceableEntity} from "../map/Interface";

class MoveTracingHandle implements IMoveTracingHandle {

    currentFrame:number;

    //创建运行数据
    create(indicator:IMoveTracingIndicator,start:IMapPoint,target:ITraceableEntity):IMoveBulletData {

    }

    //更新框架
    updateExecute(data:IMoveBulletData):IBulletUpdateResult {

    }
}