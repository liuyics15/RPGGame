////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

//关键属性集合
export interface IKeyPropertyDic {

    //注册属性
    registerProperty(key:number,value:number|string):boolean;

    //获取值
    getProperty(key:number,emptyReturn?:any):any;
    getPropertyMax(key:number,emptyReturn?:any):any;
    //设置值
    setProperty(key:number,value:any,setter:IKeyPropertyHandle):void;

    //关注属性
    watchProperty(key:number,watcher:IKeyPropertyWatcher):void;
    //取消关注
    unwatchProperty(key:number,watcher:IKeyPropertyWatcher):void;

    addPropertyObserver(watcher:IKeyPropertyWatcher):void;
    removePropertyObserver(watcher:IKeyPropertyWatcher):void;

    //锁住属性
    lockProperty(key:number,setter:IKeyPropertyLock):void;
    //解锁属性
    unlockProperty(key:number,setter:IKeyPropertyLock):void;
}

//
export interface IKeyPropertyWatcher {
    //属性改变回调
    onPropertyChanged(key:number,value:any,origin:any,max:number):void;
}

//关键属性控制器
export interface IKeyPropertyHandle {

    //设置状态拒绝回调
    onSetRefused(reason?:string):void;
}

//关键属性锁
export interface IKeyPropertyLock {

    //请求设置属性
    toPropertyFixed(key:number,value:any,setter:IKeyPropertyHandle):any;
}