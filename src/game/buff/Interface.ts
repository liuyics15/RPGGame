////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

/**
 * buff管理器
 */
export interface IBuffManager {
    //创建buff
    createBuff(indicator:IBuffIndicator):IBuffData;
    //移除buff
    removeBuff(data:IBuffData):void;
}

//buff指标
export interface IBuffIndicator {

}

//buff数据
export interface IBuffData {

}