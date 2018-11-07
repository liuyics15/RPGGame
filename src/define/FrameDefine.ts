////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2018 LIUYICS15
////////////////////////////////////////////////////////////////////////////////

//配置类型
export enum EConfType {
    RUNTIME,
    TEXT,
    MAP,
    ACTOR,
    SKILL,
}

//元素类型
export enum EBasicType {
    BYTE = 0x01,
    UBYTE = 0x02,
    SHORT = 0x03,
    USHORT = 0x04,
    INT = 0x05,
    UINT = 0x06,
    //接受的数据不能超过js最大安全整形0xFFFFFFFFFFFFF
    INT64 = 0x07,
    UINT64 = 0x08,

    FLOAT = 0x09,
    DOUBLE = 0x0A,

    //非标准UTF
    UTF8_1 = 0x22,
    UTF8_2 = 0x24,
    UTF8_4 = 0x26,

    //非标准UTF
    UTF16_1 = 0x42,
    UTF16_2 = 0x44,
    UTF16_4 = 0x46
}