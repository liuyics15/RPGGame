import {ITimeClock} from "./time/ITimeClock";
import {IFrameClock} from "./time/IFrameClock";

export interface IGameInstance {
    //计时器
    timeClock:ITimeClock;
    frameClock:IFrameClock;
}

let GameIns:IGameInstance;