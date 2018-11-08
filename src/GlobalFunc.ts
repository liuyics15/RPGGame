/**
 * 浮点取整
 * @param value 浮点数
 * @param fixed 保留小数点位数
 */
export function numRound(value:number,fixed:number=0):number {
    let raise = Math.pow(10,fixed);
    return Math.round(value * raise)/raise;
}

/**
 * 浮点取整
 * @param value 浮点数
 * @param fixed 保留小数点位数
 */
export function numCeil(value:number,fixed:number=0):number {
    let raise = Math.pow(10,fixed);
    return Math.ceil(value * raise)/raise;
}

/**
 * 浮点取整
 * @param value 浮点数
 * @param fixed 保留小数点位数
 */
export function numFloor(value:number,fixed:number=0):number {
    let raise = Math.pow(10,fixed);
    return Math.floor(value * raise)/raise;
}