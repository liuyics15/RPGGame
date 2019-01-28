//时钟
export interface IFrameClock {

    //延时调用
    delayCall(frameout:number,callback:(...args)=>void,thisArg?:any,...args):number;
    //取消延时
    cancelDelayCall(handle:number):boolean;

    //增加观察
    addObserver(watcher:IFrameObserver):void;
    //删除观察
    removeObserver(watcher:IFrameObserver):boolean;
}

//时钟观察者
export interface IFrameObserver {
    //更新时间
    updateTime(framestamp:number):void;
}