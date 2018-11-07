import * as fs from "fs";
import * as path from "path";

import {IConfManager} from "./Interface";
import {EConfType} from "../define/FrameDefine";

const C_CONF_FILE_MAP = {
    [EConfType.TEXT]:"cfg_lang",
    [EConfType.MAP]:"cfg_map",
    [EConfType.SKILL]:"cfg_skill",
    [EConfType.ACTOR]:"cfg_actor",
    [EConfType.RUNTIME]:"cfg_runtime"
};

enum EConfTypeRef {
    BYTE = "byte",
    SHORT = "short",
    INT = "int",
    STRING = "string",
}

class ConfManager_P implements IConfManager {

    private _rootDir:string;
    private _confMap:{[type:number]:any};

    setConfDir(path:string):void {
        this._rootDir = path;
    }

    loadConf(type?:EConfType):Promise<any> {
        if(!this._rootDir) {
            return Promise.reject("");
        }
        if (type === undefined) {
            let promiseVec = [];
            promiseVec.push(this.loadConfOf(EConfType.RUNTIME));
            promiseVec.push(this.loadConfOf(EConfType.TEXT));
            promiseVec.push(this.loadConfOf(EConfType.ACTOR));
            promiseVec.push(this.loadConfOf(EConfType.MAP));
            promiseVec.push(this.loadConfOf(EConfType.SKILL));
            return Promise.all(promiseVec);
        }
        else {
            return this.loadConfOf(type);
        }
    }

    private loadConfOf(type:EConfType):Promise<void> {
        if(!this._rootDir) {
            return Promise.reject("配置根目录未设置！");
        }
        let fileName = C_CONF_FILE_MAP[type];
        if(!fileName) {
            return Promise.reject("类型未配置："+type);
        }
        let filePath = path.join(this._rootDir,fileName);
        return this.loadCSV(type,filePath);
    }

    private loadCSV(saveType:number,loadPath:string):Promise<void> {
        return new Promise((resolve, reject) => {
            fs.readFile(loadPath,(err,data)=> {
                if (err) {
                    console.error(err);
                    return reject("加载文件出错");
                }
                else {
                    let contentStr = data.toString();
                    let rows = contentStr.split('\r\n');
                    let totalRows = rows.length;
                    if (totalRows < 4) {
                        return reject("文件不规范！");
                    }
                    //第1行为编辑标题
                    let editTitles = rows[0].split(',');
                    //第2行为编辑注释
                    let editDesVec = rows[1].split(',');
                    //第3行为列解析类型
                    let typeRefs = <EConfTypeRef[]>rows[2].split(',');
                    let hasWrongRef = typeRefs.some(ref => !EConfTypeRef[ref]);
                    if (hasWrongRef) {
                        return reject("配置含有不规范类型定义");
                    }
                    //第4行为列属性名称
                    let properties = rows[3].split(',');
                    //约定首属性为唯一ID
                    let idPropertyKey = properties[0];
                    let confDic = {};
                    //大于4的行为数据条目
                    for(let i = 4;i < totalRows; i++) {
                        let itemData = this.parseItem(properties,typeRefs,rows[i]);
                        confDic[itemData[idPropertyKey]] = itemData;
                    }
                    this._confMap[saveType] = confDic;
                }
            });
        });
    }

    private parseItem(properties:string[],typeRefs:EConfTypeRef[],line:string):any {
        let values = line.split(',');
        let length = properties.length;
        let data = {};
        for(let i = 0;i < length; i++) {
            data[properties[i]] = this.parseValue(typeRefs[i],values[i]);
        }
        return data;
    }

    private parseValue(typeRef:EConfTypeRef,data:string):string|number {
        if (typeRef == EConfTypeRef.STRING) {
            return data;
        }
        let valueNum:number = parseInt(data);
        switch (typeRef) {
            case EConfTypeRef.BYTE:
                valueNum &= 0xFF;
                break;
            case EConfTypeRef.SHORT:
                valueNum &= 0xFFFF;
                break;
            case EConfTypeRef.INT:
                valueNum &= 0xFFFFFFFF;
                break;
        }
        return valueNum;
    }

    getConfItem(type:EConfType,itemID?:number):any|undefined {
        let confDic = this._confMap[type];
        if (itemID == undefined) {
            return confDic;
        }
        if (confDic) {
            return confDic[itemID];
        }
    }

    setConfItem(type:EConfType,itemID:number|any,data?:any):void {
        let confDic = this._confMap[type];
        if(!confDic) {
            confDic = this._confMap[type] = {};
        }
        if (typeof itemID == "number") {
            confDic[itemID] = data;
        }
        else {
            this._confMap[type] = itemID;
        }
    }

    delConfItem(type?:EConfType,itemID?:number):void {
        if (type == undefined) {
            this._confMap = {};
        }
        else if (itemID == undefined) {
            delete this._confMap[itemID];
        }
        else if (this._confMap[type]) {
            delete this._confMap[type][itemID];
        }
    }
}

export const ConfManager:{new():IConfManager} = ConfManager_P;