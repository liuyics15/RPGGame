import {IRuntimeConf} from "./RuntimeConf";
import {IActorConf} from "./ActorConf";
import {EConfType} from "../define/FrameDefine";

export interface IConfManager {

    //设置目录
    setConfDir(path:string):void;

    //加载配置-全部
    loadConf():Promise<any>;
    //加载配置-指定类型
    loadConf(type:EConfType):Promise<void>;

    //获取配置
    getConfItem(type:EConfType,itemID:number):any|undefined;
    getConfItem(type:EConfType.RUNTIME):IRuntimeConf;
    getConfItem(type:EConfType.TEXT,textID:number):string;
    getConfItem(type:EConfType.ACTOR,actorID:number):IActorConf;

    //设置配置
    setConfItem(type:EConfType,itemID:number,data:any):void;
    setConfItem(type:EConfType.RUNTIME,data:IRuntimeConf):void;
    setConfItem(type:EConfType.TEXT,textID:number,value:string):void;
    setConfItem(type:EConfType.ACTOR,actorID:number,data:IActorConf):void;

    //删除配置
    delConfItem():void;
    delConfItem(type:EConfType):void;
    delConfItem(type:EConfType,itemID:number):void;
}