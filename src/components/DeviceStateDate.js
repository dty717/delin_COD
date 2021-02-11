import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Spacer from './Spacer'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native-elements'

class dataStruct {
    constructor(name, pos, doubleValue, intValue, valueType, scale, args, model) {
        this.name = name;
        this.pos = pos;
        this.doubleValue = doubleValue; intValue, this.valueType = valueType; scale, this.args = args;
        this.model = model

    }
}

const shiftIndex = 0x40 * 2 - 3;

const valueTYPE = {
    intValue: 0x0000,
    doubleValue: 0x0001,
    readOneValue: 0x0002,
}

function open_or_close(val) {
    if (val == 0)
        return "关";
    else
        return "开";
}
function normal_or_not(val) {
    if (val == 0) {
        return "正常";
    }
    else
        return "不正常";
}
function heat_or_not(val) {
    if (val != 0) {
        return "加热";
    }
    else
        return "未加热";

}
function blank_or_not(val) {
    if (val == 1) {
        return "空白样";
    }
    else {
        return "水样";
    }
}
function use_or_not(val) {
    if (val == 1) {
        return "启用";
    }
    else {
        return "未启用";
    }
}

function tubeStateString(val) {
    switch (val) {
        case 0:
            return "弃用";
        case 1:
            return "空闲";
        case 2:
            return "配液";
        case 3:
            return "加热";
        case 5:
            return "等待滴定";
        case 6:
            return "滴定准备";
        case 7:
            return "超级清洗";
    }
    return "";
}

//0-未滴定，1-滴定准备，2-开始滴定，3-清洗滴定罐
function didingStateString(val) {
    switch (val) {
        case 0:
            return "未滴定";
        case 1:
            return "滴定准备";
        case 2:
            return "开始滴定";
        case 3:
            return "清洗滴定罐";
        case 4:
            return "读蒸馏水光电压";
        case 5:
            return "读取水样光电压";
    }
    return "";
}



function enough_or_not(val) {
    switch (val) {
        case 0:
            return "不缺";
        case 1:
            return "空缺";
    }
    return "";
}


function commonString(val) {
    return val + "";
}

var dataState = [
    new dataStruct("A组1#温度", 0x40 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("A组2#温度", 0x41 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("A组3#温度", 0x42 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("A组4#温度", 0x43 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("A组5#温度", 0x44 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("A组6#温度", 0x45 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("A组7#温度", 0x46 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("A组8#温度", 0x47 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("A组9#温度", 0x48 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("A组风扇状态", 0x49 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, open_or_close),
    new dataStruct("A组循环泵状态", 0x49 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, open_or_close),
    new dataStruct("A组风扇异常状态", 0x49 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, normal_or_not),
    new dataStruct("A组循环泵异常状态", 0x49 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, normal_or_not),
    new dataStruct("A组系统状态", 0x49 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 4, normal_or_not),

    new dataStruct("A组1#加热状态", 0x4A * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, heat_or_not),
    new dataStruct("A组2#加热状态", 0x4A * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, heat_or_not),
    new dataStruct("A组3#加热状态", 0x4A * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, heat_or_not),
    new dataStruct("A组4#加热状态", 0x4A * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, heat_or_not),
    new dataStruct("A组5#加热状态", 0x4A * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 4, heat_or_not),
    new dataStruct("A组6#加热状态", 0x4A * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 5, heat_or_not),
    new dataStruct("A组7#加热状态", 0x4A * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 6, heat_or_not),
    new dataStruct("A组8#加热状态", 0x4A * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 7, heat_or_not),
    new dataStruct("A组9#加热状态", 0x4A * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 8, heat_or_not),

    new dataStruct("A组1#加热错误状态", 0x4B * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, normal_or_not),
    new dataStruct("A组2#加热错误状态", 0x4B * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, normal_or_not),
    new dataStruct("A组3#加热错误状态", 0x4B * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, normal_or_not),
    new dataStruct("A组4#加热错误状态", 0x4B * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, normal_or_not),
    new dataStruct("A组5#加热错误状态", 0x4B * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 4, normal_or_not),
    new dataStruct("A组6#加热错误状态", 0x4B * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 5, normal_or_not),
    new dataStruct("A组7#加热错误状态", 0x4B * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 6, normal_or_not),
    new dataStruct("A组8#加热错误状态", 0x4B * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 7, normal_or_not),
    new dataStruct("A组9#加热错误状态", 0x4B * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 8, normal_or_not),

    new dataStruct("A组1#温度测量异常状态", 0x4C * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, normal_or_not),
    new dataStruct("A组2#温度测量异常状态", 0x4C * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, normal_or_not),
    new dataStruct("A组3#温度测量异常状态", 0x4C * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, normal_or_not),
    new dataStruct("A组4#温度测量异常状态", 0x4C * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, normal_or_not),
    new dataStruct("A组5#温度测量异常状态", 0x4C * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 4, normal_or_not),
    new dataStruct("A组6#温度测量异常状态", 0x4C * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 5, normal_or_not),
    new dataStruct("A组7#温度测量异常状态", 0x4C * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 6, normal_or_not),
    new dataStruct("A组8#温度测量异常状态", 0x4C * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 7, normal_or_not),
    new dataStruct("A组9#温度测量异常状态", 0x4C * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 8, normal_or_not),

    new dataStruct("B组1#温度", 0x4D * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("B组2#温度", 0x4E * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("B组3#温度", 0x4F * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("B组4#温度", 0x50 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("B组5#温度", 0x51 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("B组6#温度", 0x52 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("B组7#温度", 0x53 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("B组8#温度", 0x54 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("B组9#温度", 0x55 * 2 - shiftIndex, 0, 0, valueTYPE.doubleValue, 10, 0, commonString),
    new dataStruct("B组风扇状态", 0x56 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, open_or_close),
    new dataStruct("B组循环泵状态", 0x56 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, open_or_close),
    new dataStruct("B组风扇异常状态", 0x56 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, normal_or_not),
    new dataStruct("B组循环泵异常状态", 0x56 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, normal_or_not),
    new dataStruct("B组系统状态", 0x56 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 4, normal_or_not),

    new dataStruct("B组1#加热状态", 0x57 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, heat_or_not),
    new dataStruct("B组2#加热状态", 0x57 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, heat_or_not),
    new dataStruct("B组3#加热状态", 0x57 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, heat_or_not),
    new dataStruct("B组4#加热状态", 0x57 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, heat_or_not),
    new dataStruct("B组5#加热状态", 0x57 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 4, heat_or_not),
    new dataStruct("B组6#加热状态", 0x57 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 5, heat_or_not),
    new dataStruct("B组7#加热状态", 0x57 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 6, heat_or_not),
    new dataStruct("B组8#加热状态", 0x57 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 7, heat_or_not),
    new dataStruct("B组9#加热状态", 0x57 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 8, heat_or_not),

    new dataStruct("B组1#加热错误状态", 0x58 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, normal_or_not),
    new dataStruct("B组2#加热错误状态", 0x58 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, normal_or_not),
    new dataStruct("B组3#加热错误状态", 0x58 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, normal_or_not),
    new dataStruct("B组4#加热错误状态", 0x58 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, normal_or_not),
    new dataStruct("B组5#加热错误状态", 0x58 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 4, normal_or_not),
    new dataStruct("B组6#加热错误状态", 0x58 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 5, normal_or_not),
    new dataStruct("B组7#加热错误状态", 0x58 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 6, normal_or_not),
    new dataStruct("B组8#加热错误状态", 0x58 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 7, normal_or_not),
    new dataStruct("B组9#加热错误状态", 0x58 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 8, normal_or_not),

    new dataStruct("B组1#温度测量异常状态", 0x59 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, normal_or_not),
    new dataStruct("B组2#温度测量异常状态", 0x59 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, normal_or_not),
    new dataStruct("B组3#温度测量异常状态", 0x59 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, normal_or_not),
    new dataStruct("B组4#温度测量异常状态", 0x59 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, normal_or_not),
    new dataStruct("B组5#温度测量异常状态", 0x59 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 4, normal_or_not),
    new dataStruct("B组6#温度测量异常状态", 0x59 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 5, normal_or_not),
    new dataStruct("B组7#温度测量异常状态", 0x59 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 6, normal_or_not),
    new dataStruct("B组8#温度测量异常状态", 0x59 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 7, normal_or_not),
    new dataStruct("B组9#温度测量异常状态", 0x59 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 8, normal_or_not),

    new dataStruct("消解管1状态", 0x5A * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管2状态", 0x5B * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管3状态", 0x5C * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管4状态", 0x5D * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管5状态", 0x5E * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管6状态", 0x5F * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管7状态", 0x60 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管8状态", 0x61 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管9状态", 0x62 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管10状态", 0x63 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管11状态", 0x64 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管12状态", 0x65 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管13状态", 0x66 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管14状态", 0x67 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管15状态", 0x68 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管16状态", 0x69 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管17状态", 0x6A * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),
    new dataStruct("消解管18状态", 0x6B * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, tubeStateString),

    new dataStruct("滴定罐状态", 0x6C * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, didingStateString),
    new dataStruct("整体流程状态", 0x6D * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, (val) => {
        switch (val) {
            case 0:
                return "系统空闲";
            case 1:
                return "自动流程";
            case 2:
                return "手动流程";
            default:
                break;
        }
        return "";
    }),
    new dataStruct("做样数目", 0x6E * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, commonString),
    new dataStruct("当前采样样品标号", 0x6F * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, commonString),
    new dataStruct("当前滴定样品标号", 0x70 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, commonString),
    new dataStruct("当前滴定消解管号", 0x71 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, commonString),
    new dataStruct("当前滴定水样是否空白", 0x72 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, (val) => {
        if (val == 0) {
            return "水样";
        } else {
            return "空白样";
        }
    }),
    new dataStruct("初始运行量程", 0x73 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, commonString),
    new dataStruct("当前滴定量程", 0x74 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, commonString),

    //Hg-CrL-CrH-Ag
    new dataStruct("试剂Hg", 0x75 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, enough_or_not),
    new dataStruct("试剂CrL", 0x75 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, enough_or_not),
    new dataStruct("试剂CrH", 0x75 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, enough_or_not),
    new dataStruct("试剂Ag", 0x75 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, enough_or_not),

    //指示剂-低浓度滴定剂-高浓度滴定剂-水
    new dataStruct("指示剂", 0x76 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, enough_or_not),
    new dataStruct("低浓度滴定剂", 0x76 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, enough_or_not),
    new dataStruct("高浓度滴定剂", 0x76 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, enough_or_not),
    new dataStruct("蒸馏水", 0x76 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, enough_or_not),

    new dataStruct("水样", 0x77 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, enough_or_not),

    new dataStruct("二维码采集标志", 0x78 * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, commonString),

    //Hg-CrL-CrH-Ag
    new dataStruct("启用试剂Hg", 0x79 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 5, use_or_not),
    new dataStruct("启用试剂CrL", 0x79 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 6, use_or_not),
    new dataStruct("启用试剂CrH", 0x79 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 7, use_or_not),
    new dataStruct("启用试剂Ag", 0x79 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 8, use_or_not),

    //指示剂-低浓度滴定剂-高浓度滴定剂-水
    new dataStruct("启用低浓度滴定剂", 0x79 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 2, use_or_not),
    new dataStruct("启用高浓度滴定剂", 0x79 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 3, use_or_not),
    new dataStruct("启用蒸馏水", 0x79 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 4, use_or_not),
    new dataStruct("启用指示剂", 0x79 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 1, use_or_not),
    new dataStruct("启用水样", 0x79 * 2 - shiftIndex, 0, 0, valueTYPE.readOneValue, 1, 0, use_or_not),
    new dataStruct("判断快慢速", 0x7a * 2 - shiftIndex, 0, 0, valueTYPE.intValue, 1, 0, commonString),
]



const DeviceStateDate = ({ index,val, header }) => {
    
    return (
        <View style={header ? styles.containerHeader : styles.container}>
            <View style={styles.col1}>
                <Text style={header ? styles.textHeader : styles.text}>{header ?index: dataState[index].name}</Text>
            </View>
            <View style={styles.col2}>
                <Text style={header ? styles.textHeader : styles.text}>{header ?val:dataState[index].model(val)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        justifyContent: "flex-start",

        marginTop: 2
    },
    container: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: 2,
        borderTopWidth: 1
    },
    textHeader: {
        fontSize: 24
    },
    text: {
        fontSize: 20,
    },
    col1: {
        margin: 1,
        width: 120,
        flex: 2
    },
    col2: {
        margin: 1,
        width: 120,
        flex: 1,
    },
})

export default DeviceStateDate