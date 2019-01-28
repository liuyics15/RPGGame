import {toDigits} from "../GlobalFunc";

export class InfinityInt {

    private _digits:number[];

    public add(value:number|InfinityInt):this {
        let addDigits:number[];
        if (typeof value == 'number') {
            addDigits = toDigits(value);
        }
        else {
            addDigits = value._digits;
        }
        const totalDigits = addDigits.length;
        for(let i = 0;i < totalDigits; i++) {
            let digit = addDigits[i];
            digit && this.addAt(i,digit);
        }
        return this;
    }

    public del(value:number|InfinityInt):this {
        let delDigits:number[];
        if (typeof value == 'number') {
            delDigits = toDigits(value);
        }
        else {
            delDigits = value._digits;
        }
        const totalDigits = delDigits.length;
        for(let i = 0;i < totalDigits; i++) {
            let digit = -delDigits[i];
            digit && this.addAt(i,digit);
        }
        return this;
    }

    private addAt(bitIndex:number,value:number):void {
        if (bitIndex == this._digits.length) {
            this._digits.push(value);
        }
    }
}