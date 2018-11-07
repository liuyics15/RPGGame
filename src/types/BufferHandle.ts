////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
//  通过配置来进行字节序列化和反序列化
//
////////////////////////////////////////////////////////////////////////////////

import {EBasicType} from "../define/FrameDefine";

export type BufferConf = EBasicType | {[key:string]:BufferConf} | any[];

interface IByteInfo {
    buffer:ArrayBuffer;
    viewer:DataView;
    position:number;
}

const C_BASIC_TYPE_SIZE = {
    [EBasicType.BYTE]:1,
    [EBasicType.UBYTE]:1,
    [EBasicType.SHORT]:2,
    [EBasicType.USHORT]:2,
    [EBasicType.INT]:4,
    [EBasicType.UINT]:4,
    [EBasicType.INT64]:8,
    [EBasicType.UINT64]:8,
    [EBasicType.FLOAT]:4,
    [EBasicType.DOUBLE]:8
};

export function writeToBuffer(conf: BufferConf,data: any):ArrayBuffer {
    let totalBytes = sizeOf(conf,data);
    let buffer = new ArrayBuffer(totalBytes);
    let viewer = new DataView(buffer);
    let position = 0;
    let bytes:IByteInfo = {
        buffer,viewer,position
    };
    let text:string;
    writeBuffer(bytes,conf,data);
    return bytes.buffer;
}

export function readFromBuffer(buffer:ArrayBuffer,conf:BufferConf,offset:number=0):any {
    let viewer = new DataView(buffer);
    let position = offset;
    let bytes:IByteInfo = {
        buffer,viewer,position
    };
    return readBuffer(bytes,conf);
}

function readBuffer(bytes:IByteInfo,conf:BufferConf):any {
    if (typeof conf == "number") {
        return readBasic(bytes,conf);
    }
    else if (typeof conf == "object") {
        if (conf instanceof Array) {
            return readArray(bytes,conf);
        }
        else {
            return readObject(bytes,conf);
        }
    }
}

function readObject(bytes:IByteInfo,conf:{[key:string]:BufferConf}):any {
    let valueDic = {};
    for(let key in conf) {
        valueDic[key] = readBuffer(bytes,conf[key]);
    }
    return valueDic;
}

function readArray(bytes:IByteInfo,conf:any[]):any[] {
    let content = conf[0];
    let head = conf[1];
    let length = readNumber(bytes,head);
    let valueVec = [];
    for(let i = 0;i < length; i++) {
        valueVec.push(readBuffer(bytes,content));
    }
    return valueVec;
}

function readBasic(bytes:IByteInfo,conf:EBasicType):number|string {
    if (conf > 0x10) {
        let head = conf & 0x0F;
        let char = (conf & 0xF0) >> 4;
        return readString(bytes,head,char);
    }
    else {
        return readNumber(bytes,conf);
    }
}

function readString(bytes:IByteInfo,head:EBasicType,char:EBasicType):string {
    let totalChars = readNumber(bytes,head);
    let value = "";
    for(let i = 0;i < totalChars; i++) {
        value += String.fromCharCode(readNumber(bytes,char));
    }
    return value;
}

function readNumber(bytes:IByteInfo,conf:EBasicType):number {
    let value:number;
    switch (conf) {
        case EBasicType.BYTE:
            value = bytes.viewer.getInt8(bytes.position);
            break;
        case EBasicType.UBYTE:
            value = bytes.viewer.getUint8(bytes.position);
            break;
        case EBasicType.SHORT:
            value = bytes.viewer.getInt16(bytes.position);
            break;
        case EBasicType.USHORT:
            value = bytes.viewer.getUint16(bytes.position);
            break;
        case EBasicType.INT:
            value = bytes.viewer.getInt32(bytes.position);
            break;
        case EBasicType.UINT:
            value = bytes.viewer.getUint32(bytes.position);
            break;
        case EBasicType.INT64:
            let high = bytes.viewer.getInt32(bytes.position);
        case EBasicType.UINT64:
            high = bytes.viewer.getUint32(bytes.position);
            let low = bytes.viewer.getUint32(bytes.position + 4);
            value = (high << 32) + low;
            break;
    }
    bytes.position += C_BASIC_TYPE_SIZE[conf];
    return value;
}

function sizeOf(conf:BufferConf,data:any):number {
    if(!conf) {
        return 0;
    }
    if (typeof conf == "number") {
        return sizeOfBasic(conf,data);
    }
    else if (typeof conf == "object") {
        if (conf instanceof Array) {
            return sizeOfArray(conf,data);
        }
        else {
            return sizeOfObject(conf,data);
        }
    }
    else {
        throw new Error("");
    }
}

function sizeOfArray(conf:any[],dataVec:any[]):number {
    let content = conf[0];
    let head = conf[1];
    let length = dataVec.length;
    let totalBytes = C_BASIC_TYPE_SIZE[head];
    for(let i = 0;i < length; i++) {
        totalBytes += sizeOf(content,dataVec[i]);
    }
    return totalBytes;
}

function sizeOfObject(confDic:{[key:string]:BufferConf},dataDic:any):number {
    let totalBytes = 0;
    for(let key in confDic) {
        totalBytes += sizeOf(confDic[key],dataDic[key])
    }
    return totalBytes;
}

function sizeOfBasic(conf:EBasicType,data:number|string):number {
    if (conf > 0x10) {
        let char = (conf & 0xF0) >> 4;
        let head = conf & 0x0F;
        return C_BASIC_TYPE_SIZE[head] + C_BASIC_TYPE_SIZE[char] * (<string>data).length;
    }
    else {
        return C_BASIC_TYPE_SIZE[conf];
    }
}

function writeBuffer(bytes: IByteInfo,conf:BufferConf,data:any):void {
    if(!conf || !data) {
        throw new Error();
    }
    if (typeof conf == "number") {
        writeBasic(bytes,conf,data);
    }
    else if (typeof conf == "object") {
        if (conf instanceof Array) {
            writeArray(bytes,conf,data);
        }
        else {
            writeObject(bytes,conf,data);
        }
    }
    else {
        throw new Error();
    }
}

function writeArray(bytes:IByteInfo,conf:any[],dataVec:any[]):void {
    let content = conf[0];
    let head = conf[1];
    let length = dataVec.length;
    writeNumber(bytes,head,length);
    for(let i = 0;i < length; i++) {
        writeBuffer(bytes,content,dataVec[i]);
    }
}

function writeObject(bytes:IByteInfo,confDic:{[key:string]:BufferConf},dataDic:any):void {
    for(let key in confDic) {
        writeBuffer(bytes,confDic[key],dataDic[key]);
    }
}

function writeBasic(bytes:IByteInfo,conf:EBasicType,data:number|string):void {
    if (conf < 0x10) {
        writeNumber(bytes,conf,<number>data);
    }
    else {
        let char = (conf & 0xF0) >> 4;
        let head = conf & 0x0F;
        writeString(bytes,head,char,<string>data);
    }
}

function writeString(bytes:IByteInfo,head:EBasicType,char:EBasicType,value:string):void {
    let totalChars = value.length;
    writeNumber(bytes,head,totalChars);
    for(let i = 0;i < totalChars; i++) {
        let charCode = value.charCodeAt(i);
        writeNumber(bytes,char,charCode);
    }
}

function writeNumber(bytes:IByteInfo,conf:EBasicType,data:number):void {
    switch (conf) {
        case EBasicType.BYTE:
            bytes.viewer.setInt8(bytes.position,data);
            break;
        case EBasicType.UBYTE:
            bytes.viewer.setUint8(bytes.position,data);
            break;
        case EBasicType.SHORT:
            bytes.viewer.setInt16(bytes.position,data);
            break;
        case EBasicType.USHORT:
            bytes.viewer.setUint16(bytes.position,data);
            break;
        case EBasicType.INT:
            bytes.viewer.setInt32(bytes.position,data);
            break;
        case EBasicType.UINT:
            bytes.viewer.setUint32(bytes.position,data);
            break;
        case EBasicType.INT64:
        case EBasicType.UINT64:
            let high = (data & 0xFFFFF00000000) >> 32;
            //正负修正
            if (conf == EBasicType.INT64 && data < 0) {
                high += (1 << 31);
            }
            let low = data & 0xFFFFFFFF;
            bytes.viewer.setUint32(bytes.position,high);
            bytes.viewer.setUint32(bytes.position+4,low);
            break;
    }
    bytes.position += C_BASIC_TYPE_SIZE[conf];
}