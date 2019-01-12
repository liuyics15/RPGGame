
export interface IActionCenter {

    execute(action:number,executor:any,taker:any,param:any):number;

    backToFrame(value:number):void;

    getActionRecords(executor):IAction[];
    getActionRecords(executor,frame:number):IAction[];
    getActionRecords(executor,startFrame:number,endFrame:number):IAction[];
    getActionRecords(executor,taker):IAction[];
    getActionRecords(executor,taker,frame:number):IAction[];
    getActionRecords(executor,taker,startFrame:number,endFrame:number):IAction[];
}

export interface IActionProducer {

    accept(executor:any):boolean;

    execute(executor:any,taker:any,param:any):IAction;
}

export interface IAction {
    undo():boolean;
}