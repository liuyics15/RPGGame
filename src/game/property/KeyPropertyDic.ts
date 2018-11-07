import {IKeyPropertyDic, IKeyPropertyHandle, IKeyPropertyLock, IKeyPropertyWatcher} from "./Interface";
import {EPropertyKey} from "../../define/GameDefine";

export class KeyPropertyDic implements IKeyPropertyDic {

    //属性集合
    private readonly _propDic:{[key:number]:any} = {};
    //观察者集合
    private readonly _watchersDic:{[key:number]:IKeyPropertyWatcher[]} = {};
    private readonly _observerVec:IKeyPropertyWatcher[] = [];
    //属性锁集合
    private readonly _locksDic:{[key:number]:IKeyPropertyLock[]} = {};

    //注册属性
    registerProperty(key:number,value:number|string|boolean):boolean {
        if (this._propDic.hasOwnProperty(key)) {
            return false;
        }
        this._propDic[key] = value;
        return true;
    }

    //获取值
    getProperty(key:number,defaultValue?:any):any {
        if (this._propDic.hasOwnProperty(key)) {
            return this._propDic[key];
        }
        else {
            return defaultValue;
        }
    }
    //设置值
    setProperty(key:number,value:any,setter:IKeyPropertyHandle):void {
        let locks = this._locksDic[key];
        if (locks && locks.length) {
            let totalLocks = locks.length;
            for(let i = 0;i < totalLocks; i++) {
                value = locks[i].toPropertyFixed(key,value,setter);
            }
        }
        let origin = this._propDic[key];
        if (origin != value) {
            this._propDic[key] = value;
            this.notifyChanged(key,value,origin);
        }
    }

    //关注属性
    watchProperty(key:number,setter:IKeyPropertyWatcher):void {
        let watchers = this._watchersDic[key];
        if(!watchers) {
            watchers = this._watchersDic[key] = [];
        }
        if (watchers.indexOf(setter) == -1) {
            watchers.push(setter);
        }
    }
    //取消关注
    unwatchProperty(key:number,setter:IKeyPropertyWatcher):void {
        let watchers = this._watchersDic[key];
        if (watchers) {
            let watchIndex = watchers.indexOf(setter);
            if (watchIndex != -1) {
                watchers.splice(watchIndex,1);
            }
        }
    }

    addPropertyObserver(watcher:IKeyPropertyWatcher):void {
        let watcherIndex = this._observerVec.indexOf(watcher);
        if (watcherIndex == -1) {
            this._observerVec.push(watcher);
        }
    }

    removePropertyObserver(watcher:IKeyPropertyWatcher):void {
        let watcherIndex = this._observerVec.indexOf(watcher);
        if (watcherIndex != -1) {
            this._observerVec.splice(watcherIndex,1);
        }
    }

    //锁住属性
    lockProperty(key:number,locker:IKeyPropertyLock):void {
        let locks = this._locksDic[key];
        if(!locks) {
            locks = this._locksDic[key] = [];
        }
        if (locks.indexOf(locker) == -1) {
            locks.push(locker);
        }
    }
    //解锁属性
    unlockProperty(key:number,setter:IKeyPropertyLock):void {
        let locks = this._locksDic[key];
        if (locks) {
            let lockIndex = locks.indexOf(setter);
            if (lockIndex != -1) {
                locks.splice(lockIndex,1);
            }
        }
    }
    //提示属性改动
    private notifyChanged(key:number,value:any,origin:any):void {
        let watchers = this._watchersDic[key];
        if (watchers && watchers.length) {
            watchers = watchers.concat();
            watchers.forEach(watcher => {
                watcher.onPropertyChanged(key,value,origin,this.getPropertyMax(key));
            });
        }
    }

    getPropertyMax(key:number,defaultValue?:any):number {
        switch (key) {
            case EPropertyKey.HEALTH:
                return this.getProperty(EPropertyKey.MAX_HEALTH,defaultValue);
            case EPropertyKey.MAGIC:
                return this.getProperty(EPropertyKey.MAX_MAGIC,defaultValue);
            case EPropertyKey.ENERGY:
                return this.getProperty(EPropertyKey.MAX_ENERGY,defaultValue);
            default:
                return defaultValue;
        }
    }
}