
class MoveObJ {
}

const enum StepOffset {
    UP,UP_RIGHT,RIGHT,DOWN_RIGHT,DOWN,DOWN_LEFT,LEFT,UP_LEFT
}

const STEP_BITS = 3;
const BUFFER_INT_COUNT = 10;
const INT_STEPS = 10;
const INT_BIT_OFFSET = 32 - (STEP_BITS*INT_STEPS);
const BUFFER_STEPS = BUFFER_INT_COUNT*INT_STEPS;
// const BUFFER_BYTES = BUFFER_INT_COUNT*4;


class TraceData {

    private readonly _historyBuffers:Uint32Array[];

    private _curBuffer:Uint32Array;

    private _curIntIndex:number;
    private _curIntOffset:number;

    constructor() {
        this.resetCurrentBuffer();
        this._historyBuffers = [];
    }

    public addStepOffset(offset:StepOffset):void {
        let nextIntOffset = this._curIntOffset + 1;
        this._curBuffer[this._curIntIndex] = (this._curBuffer[this._curIntIndex] << STEP_BITS) + offset;
        //普通存入
        if (nextIntOffset < INT_STEPS) {
            this._curIntOffset = nextIntOffset;
        }
        //int上限
        else if (this._curIntIndex + 1 < BUFFER_INT_COUNT) {
            this._curIntOffset = 0;
            this._curIntIndex ++;
        }
        //buffer上限
        else {
            this._historyBuffers.push(this._curBuffer);
            this.resetCurrentBuffer();
        }
    }

    private resetCurrentBuffer():void {
        this._curBuffer = new Uint32Array(BUFFER_INT_COUNT);
        this._curIntIndex = 0;
        this._curIntOffset = 0;
    }

    public toStepsUint8():Uint8Array {
        let totalSteps = this._historyBuffers.length * BUFFER_STEPS + this._curIntIndex * INT_STEPS + this._curIntOffset;
        let stepBuffer = new Uint8Array(totalSteps);
        let curStep = 0;

        let parseStepsFromInt = (intValue:number,totalSteps:number)=> {
            for(let step = 0;step < totalSteps;step ++) {
                stepBuffer[curStep] = this.getStepValue(intValue,step);
                curStep ++;
            }
        };
        let parseStepsFromBuffer = (buffer:Uint32Array,totalInts:number)=> {
            for(let intIndex = 0;intIndex < totalInts;intIndex ++) {
                let intValue = buffer[intIndex];
                parseStepsFromInt(intValue,INT_STEPS);
            }
        };

        for(let buffer of this._historyBuffers) {
            parseStepsFromBuffer(buffer,BUFFER_INT_COUNT);
        }
        parseStepsFromBuffer(this._curBuffer,this._curIntIndex);
        parseStepsFromInt(this._curBuffer[this._curIntIndex],this._curIntOffset);
        return stepBuffer;
    }

    private getStepValue(intValue:number,step:number):number {
        let bitOffset = INT_BIT_OFFSET + step*STEP_BITS;
        return (intValue >> (32 - (bitOffset + STEP_BITS))) & 8;
    }

    public toUint32():Uint32Array {
        let totalInt = this._historyBuffers.length * BUFFER_INT_COUNT + this._curIntIndex + 1;
        let back = new Uint32Array(totalInt);
        let current = 0;
        this._historyBuffers.forEach(buffer => {
            back.set(buffer,current);
            current += buffer.length;
        });
        back.set(this._curBuffer.subarray(0,this._curIntIndex),current);
        current += this._curIntIndex;
        // back[current] = this._curBuffer[]
        return back;
    }
}