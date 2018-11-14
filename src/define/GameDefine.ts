////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////
import {IExecuteData} from "../game/Interface";

//指标+参数->运行数据 => 下个指标+参数 整体记录

//执行任务
export interface IExecuteTask {
    //指标列表
    indicators:IIndicator[];
    //当前指标
    currentIndex:number;
    //当前指标
    currentIndicator:IIndicator;
    //运行数据
    currentData:IExecuteData;
    //参数面版
    paramBoard:{[property:string]:any};
    //运行数据列表
    executeDataVec:IExecuteData[];
}

//指标类型
export enum EIndicatorType {
    ACTION,         //单体动作
    INFECTION,      //单体影响
    BALLISTIC,      //动态弹道
    INTERACTIVE,    //交互行为
    TRIGGER,        //被动触发
}

//指标数据
export interface IIndicator {
    //指标类型
    type:EIndicatorType;
    //开始触发
    startTrigger?:IExecuteTask;
    //完成触发
    endTrigger?:IExecuteTask;
    //收集参数
    collectParams:EParamKeywords[];
}

//
export enum EParamKeywords {
    EXECUTOR = "executor",
    TARGET = "target",
    TARGET_ENTITY = "targetEntity",
    TARGET_POINT = "targetPoint",
    EXECUTOR_ENTITY = "executorEntity",
    EXECUTOR_POINT = "executorPoint"
}

//行为指标
export interface IActionIndicator extends IIndicator {
    //大类定义
    type:EIndicatorType.ACTION;
    //行为定义
    actionType:EEntityAction;
    //细分定义
    actionID:number;
    //持续时间
    duration:number;
}

//影响指标
export interface IInfectionIndicator extends IIndicator {
    //大类定义
    type:EIndicatorType.INFECTION;
    //影响类型
    infectionType:EInfectionType;
}

//弹道指标
export interface IBallisticIndicator extends IIndicator {
    //大类定义
    type:EIndicatorType.BALLISTIC;
    //子弹类型
    bulletType:EBulletType;
    //弹道类型
    ballisticType:EBallisticType;
    //特效ID
    bulletEffectID?:number;
}

//交互指标
export interface IInteractiveIndicator extends IIndicator {
    //大类定义
    type:EIndicatorType.INTERACTIVE;
    //交互类型
    interactiveType:EInteractiveType;
    //TODO:【获取目标】定义
}

//触发指标
export interface ITriggerIndicator {
    //大类定义
    type:EIndicatorType.TRIGGER;
    //触发类型
    triggerType:ETriggerType;
}

//互动类型
export enum EInteractiveType {
    ATTACK,     //攻击
    SKILL,      //技能
    GIVE,       //赠送
    STEAL,      //偷窃
    FOLLOW,     //跟随
    TRACK,      //跟踪
}

//实体状态
export enum EEntityStatus {
    HALT,       //静止
    MOVING,     //移动
    ATTACKING,  //普攻
    SPELLING,   //吟唱
    PICKING_UP, //捡起
    DIEING,     //濒死
    DEAD        //死亡
}

//主动行为
export enum EEntityAction {
    MOVE,       //移动
    TALK,       //A bord thought
    DEFEND,     //防守
    PICK_UP,    //捡起
    ATTACK,     //攻击
    USE_ITEM,   //道具
    SPELL,      //技能
}

//被动行为
export enum EPassiveAction {
    UNDER_ATTACK,   //受到攻击
    UNDER_SKILL,    //受到技能
    RECEIVED_ITEM,  //收到道具
}

//触发对象
export enum ETriggerTarget {
    MAP,    //地图
    ENTITY  //实体
}

//游戏属性键
export enum EPropertyKey {
    HEALTH,         //生命值
    MAX_HEALTH,     //最大生命
    MAGIC,          //魔法值
    MAX_MAGIC,      //最大魔法
    ENERGY,         //能量值
    MAX_ENERGY,     //最大能量

    ACCEPT_ATTACK,  //允许被打
    ACCEPT_CHOOSE,  //允许选中

    HIT_WEIGHT,     //命中权重
    MISS_WEIGHT,    //闪避权重
}

//影响类型
export enum EInfectionType {
    STATUS,         //影响状态
    PROPERTY,       //影响属性
    FORCE_ACTION,   //强制动作
    BUFF,           //创建buff
    CIRCLE,         //创建光环
}

//影响指标
export enum EPropertyInfection {
    ATTACK_DAMAGE,  //攻击伤害
    SKILL_DAMAGE,   //技能伤害
    PURE_DAMAGE,    //真实伤害
    PURE_PROPERTY   //属性影响
}

//触发类型
export enum ETriggerType {
    PROPERTY,       //属性触发
    ACTION,         //行为触发
    EVENT,          //事件触发
}

//子弹类型
export enum EBulletType {
    POINT,      //点触发
    LINE,       //线形触发
    CIRCLE,     //环形触发
    ARK,        //锥形触发
    CUSTOM,     //自定义
}

//弹道枚举
export enum EBallisticType {
    FIXED_DELAY,    //固定延时
    DIRECT_LINE,    //直线运动
    MOVE_TRACKING,  //活物追踪
}