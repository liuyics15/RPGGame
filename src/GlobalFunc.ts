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

/**
 * 数字转为位数组
 * @param value 原始值
 * @param radix 进制
 * @return digits 位列表，顺序：以十进制为例 个十百千万 从小到大
 */
export function toDigits(value: number, radix: number = 10):number[] {
    if (value % 1) {
        throw new Error();
    }
    if (radix <= 0) {
        throw new Error();
    }
    let digits:number[] = [];
    while (value) {
        let digit = value % radix;
        value = (value - digit)/radix;
        digits.push(digit);
    }
    return digits;
}