////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

/**
 * 光环管理器
 */
export interface ICircleManager {
    //
    createCircle(indicator:ICircleIndicator):ICircleData;
    //
    removeCircle(data:ICircleData):void;
}

//光环指标
export interface ICircleIndicator {

}

//光环数据
export interface ICircleData {

}