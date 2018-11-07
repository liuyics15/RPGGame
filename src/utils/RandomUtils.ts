
export class RandomUtils {

    private RANDOM_SET_A = 99;
    private RANDOM_SET_B = 77;
    private RANDOM_SET_M = 0xFFFF;
    //更新数据设置
    updateSet(a:number,b:number,mask:number):void {
        this.RANDOM_SET_A = a;
        this.RANDOM_SET_B = b;
        this.RANDOM_SET_M = mask;
    }

    //种子数值
    private _seedValue:number = 10;
    //种子数值【对外只读】
    get seedValue():number {
        return this._seedValue;
    }
    //生产随机数
    random(seedValue:number = this._seedValue):number {
        this._seedValue = (this.RANDOM_SET_A * seedValue + this.RANDOM_SET_B) % this.RANDOM_SET_M;
        return this._seedValue/this.RANDOM_SET_M;
    }
}