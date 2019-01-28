//时钟
export interface ITimeClock {

    //延时调用
    delayCall(timeout:number,callback:(...args)=>void,thisArg?:any,...args):number;
    //取消延时
    cancelDelayCall(handle:number):boolean;

    //增加观察
    addObserver(watcher:ITimeObserver):void;
    //删除观察
    removeObserver(watcher:ITimeObserver):boolean;
}

//时钟观察者
export interface ITimeObserver {
    //更新时间
    updateTime(timestamp:number):void;
}