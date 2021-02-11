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


setInterval(function(){

    return;
    if(_updateDeviceData){

        var _data1 = 10;
        var _data2 = 50;
        var _data3 = 80;
        var time = new Date().getTime();

        for (let index = 0; index <5; index++) {
            _data1 += parseInt(Math.random()*3)-1;
            _data2 += parseInt(Math.random()*3)-1;
            _data3 += parseInt(Math.random()*3)-1;
            if(_data1<1){
                _data1 = 1;
            }else if(_data1>99){
                _data1 = 99;
            }
            __dataFlow1.push({time:time+index,val:_data1});
            if(__dataFlow1.length>dataLen){
                __dataFlow1.shift();
            }
            if(_data2<1){
                _data2 = 1;
            }else if(_data2>99){
                _data2 = 99;
            }
            __dataFlow2.push({time:time+index,val:_data2});
            if(__dataFlow2.length>dataLen){
                __dataFlow2.shift();
            }
            if(_data3<1){
                _data3 = 1;
            }else if(_data3>99){
                _data3 = 99;
            }
            __dataFlow3.push({time:time+index,val:_data3});
            if(__dataFlow3.length>dataLen){
                __dataFlow3.shift();
            }
        }
        var _dataFlow1 = []
        var _dataFlow2 = []
        var _dataFlow3 = []
        /*
        var len = __dataFlow1.length;
        if(len>start - end){
        }else{
        }
        */
        var nowTime = new Date().getTime();

        for (let index = start; index < end; index++) {
            if(__dataFlow1[index-start]==undefined){
                break;
            }
            //(nowTime - __dataFlow1[index-start].time)

            _dataFlow1.push(index+","+__dataFlow1[index-start].val);
            _dataFlow2.push(index+","+__dataFlow2[index-start].val);
            _dataFlow3.push(index+","+__dataFlow3[index-start].val);
            
            /*
            _dataFlow1.push(index+","+parseInt(Math.random()*100));
            _dataFlow2.push(index+","+parseInt(Math.random()*100));
            _dataFlow3.push(index+","+parseInt(Math.random()*100));
            */
        }
        _updateDeviceData({dataFlow1:_dataFlow1,dataFlow2:_dataFlow2,dataFlow3:_dataFlow3});
    }
    //var {updateDeviceData} = useContext(Context);
    //console.log(updateDeviceData(DeviceReducer)())
},1000)

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
            <LineChart_data data1={state.data.dataFlow1}
                data2={state.data.dataFlow2} data3={state.data.dataFlow3}>
            </LineChart_data>
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