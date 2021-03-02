import React, { useEffect, useState,useContext } from 'react'
import {StyleSheet,Dimensions } from 'react-native'
import { Button, Text, Input } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import {Context as HistoryContext} from "../context/HistoryContext"
import {Context as DeviceContext} from "../context/DeviceContext"
import {Context as ParamContext} from "../context/ParamContext"
import LineChart_data from "../components/LineChart_data"
import MainHeader from '../components/MainHeader'
import { Image } from 'react-native'

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');
var _windowWidth=100;
var index = 0;
var _updateDeviceData;
var __dataFlow1 = []
var __dataFlow2 = []
var __dataFlow3 = []
var start = -300
var end = 350;
var dataLen = end-start;

const MainScreen = ()=>{
    var {state,updateDeviceData}= useContext(DeviceContext);
    var {state}= useContext(DeviceContext);
    var history = useContext(HistoryContext);
    var param= useContext(ParamContext);
    useEffect(()=>{
        //updateDeviceData({dataFlow:[1,2,3,4]});
        _updateDeviceData = updateDeviceData;
    },[])

    const [dimensions, setDimensions] = useState({ window, screen });

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
        _windowWidth = dimensions.window.width;
    };

    useEffect(() => {
        _windowWidth = dimensions.window.width;
        Dimensions.addEventListener('change', onChange);
        return () => {
            Dimensions.removeEventListener('change', onChange);
        };
    });
    console.log(history.state.historyData[0])
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <MainHeader text1 = {history.state.historyData[0]?history.state.historyData[0].state+"":""} textChange1 ={()=>{}} 
                text2 = {history.state.historyData[0]?history.state.historyData[0].COD+"":""} textChange2 ={()=>{}} 
                text3 = {param.state.蒸馏水光电压+""} textChange3 ={()=>{}} >
            </MainHeader>
            <Text>江苏德林环保技术有限公司</Text>
            <Text>销售部：025-69933188</Text>
            <Text>销售部：025-84643836</Text>
            <Text>售后部：025-69933189</Text>
            <Text>传 真： 025-69933189</Text>
            <Text>邮 箱：2850753395@qq.com</Text>
            <Text>地 址：江苏省南京市江宁区东山总部园润麒路88号</Text>
            <Image source = {require("../../assets/qr.png")}/>
        </SafeAreaView>
    )
}
const styles= StyleSheet.create({
    container:{
        marginTop:10,
        flex:1
    },
    stateBox:{
        margin:10,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    input:{
        borderWidth:1
    }
});

export default MainScreen;