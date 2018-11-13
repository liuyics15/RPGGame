
export interface IDebugger {
    /**输出*/
    log(message:string,...args):void;
    /**警告*/
    warn(message:string,...args):void;
    /**错误*/
    error(message:string,...args):void;
}

export let DEV_LOG:IDebugger;