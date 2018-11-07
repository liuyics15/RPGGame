//时钟
export interface IClock {

    //延时调用
    delayCall(timeout:number,callback:(...args)=>void,thisArg?:any,...args):number;
    //取消延时
    cancelDelayCall(handle:number):boolean;

    //增加观察
    addObserver(watcher:IClockObserver):void;
    //删除观察
    removeObserver(watcher:IClockObserver):boolean;
}

//时钟观察者
export interface IClockObserver {
    //更新时间
    updateTime(timestamp:number):void;
}