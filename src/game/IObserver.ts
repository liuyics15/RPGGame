import {EEntityAction} from "../define/GameDefine";

//命令观察者
export interface ICMDObserver {
    //目标变化
    onSubjectCMD(cmd:number,...args):void;
}

//观察目标
export interface ICMDSubject {
    //添加
    addCMDObserver(obs:ICMDObserver):boolean;
    //删除
    removeCMDObserver(obs:ICMDObserver):boolean;
    //通知变化
    notifyCMD(cmd:number, ...args):void;
}

//事件观察者
export interface IEventObserver {
    onSubjectEvent(event:string,...args):void;
}

//
export interface IEventSubject {
    //添加
    addEventObserver(obs:IEventObserver):boolean;
    //删除
    removeEventObserver(obs:IEventObserver):boolean;
    //通知变化
    notifyEvent(event:string, ...args):void;
}

export interface IStatusObserver {
    onSubjectStatus(status:number,...args):void;
}

export interface IStatusSubject {
    //添加
    addStatusObserver(obs:IStatusObserver):boolean;
    //移除
    removeStatusObserver(obs:IStatusObserver):boolean;
    //通知
    notifyStatus(status:number,...args):void;
}

//行为观察者
export interface IActionObserver {
    onSubjectAction(action:EEntityAction,...args):void;
}

export interface IActionSubject {
    //添加
    addActionObserver(obs:IEventObserver):boolean;
    //删除
    removeActionObserver(obs:IEventObserver):boolean;
    //通知变化
    notifyAction(action:EEntityAction, ...args):void;
}