import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Picker } from 'react-native'
//import { Picker } from 'react-native'
import { ScrollView } from 'react-native'
import {View,StyleSheet,Text} from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import Text_Input_Button from '../components/Text_Input_Button'
import Text_State_Button_Button from '../components/Text_State_Button_Button'
import 质控样样式 from '../components/质控样样式'
import {Context as DeviceContext} from "../context/DeviceContext"
import {Context as ParamContext} from "../context/ParamContext"


const DeviceControlScreen = ()=>{
    var param= useContext(ParamContext);
    var device = useContext(DeviceContext);
    var paramState = param.state;
    var deviceID ="COD_A_00001";
    return (
        <SafeAreaView forceInset={{top:'always'}} style = {{flex:1,marginTop:20}}>
            <ScrollView>
            <Text_Input_Button text = "做样数量" textInput={paramState.做样数量+""} textInputChange ={(e)=>{param.updateParamData(deviceID,"做样数量",e);}} textEndEditing = {(e)=>{param.uploadParamData(deviceID, "做样数量",e.nativeEvent.text);}}  >
            </Text_Input_Button>
            <Text_Input_Button text = "空白样数量" textInput={paramState.空白样数量+""} textInputChange ={(e)=>{param.updateParamData(deviceID,"空白样数量",e)}} textEndEditing = {(e)=>{param.uploadParamData(deviceID, "空白样数量",e.nativeEvent.text);}}>
            </Text_Input_Button>
            <Text_Input_Button text = "起始消解管号" textInput={paramState.起始消解管号+""} textInputChange ={(e)=>{param.updateParamData(deviceID, "起始消解管号",e)}} textEndEditing = {(e)=>{param.uploadParamData(deviceID, "起始消解管号",e.nativeEvent.text);}}>
            </Text_Input_Button>
            <View style={{marginTop:20}}>
                <质控样样式 text = "质控样1" textInput={paramState.质控一标号+""} textInputChange ={(e)=>{param.updateParamData(deviceID, "质控一标号",e);}}  
                    textEndEditing = {(e)=>{param.uploadParamData(deviceID, "质控一标号",e.nativeEvent.text);}}  
                    text2 = "浓度" textInput2={paramState.质控一浓度+""} textInputChange2 ={(e)=>{param.updateParamData(deviceID, "质控一浓度",e);}}
                    textEndEditing2 = {(e)=>{param.uploadParamData(deviceID, "质控一浓度",e.nativeEvent.text);}}  
                    buttonText ={paramState.质控一启用?"启用中":"弃用中"} buttonCall ={()=>{param.toggleParamData(deviceID,"质控一启用");}}>
                </质控样样式>
                <质控样样式 text = "质控样2" textInput={paramState.质控二标号+""} textInputChange ={(e)=>{param.updateParamData(deviceID, "质控二标号",e);}}
                    textEndEditing = {(e)=>{param.uploadParamData(deviceID, "质控二标号",e.nativeEvent.text);}}  
                    text2 = "浓度" textInput2={paramState.质控二浓度+""} textInputChange2 ={(e)=>{param.updateParamData(deviceID, "质控二浓度",e);}}
                    textEndEditing2 = {(e)=>{param.uploadParamData(deviceID, "质控二浓度",e.nativeEvent.text);}}  
                    buttonText ={paramState.质控二启用?"启用中":"弃用中"} buttonCall ={()=>{param.toggleParamData(deviceID,"质控二启用");}}>
                </质控样样式>
            </View>
            <Text_State_Button_Button text = "自动做样" stateColor="green" buttonText1 = "启动" buttonCall1 = {()=>{device.controlDevice(deviceID,"start")}} buttonText2 = "停止" buttonCall2 = {()=>{device.controlDevice(deviceID,"stop")}}> 
            </Text_State_Button_Button>
            <View style ={styles.picker}>
                <View style = {styles.text}>
                    <Text style={{fontSize:18}}>初始量程选择</Text>
                </View>
                <Picker
                    selectedValue={paramState.采样运行模式}
                    onValueChange={e =>{param.uploadParamData(deviceID, "采样运行模式",e);}}
                    style={{ width: 160 ,marginHorizontal:40, borderWidth:1}}
                    mode="dropdown">
                    <Picker.Item label="低浓度" value={0} />
                    <Picker.Item label="高浓度" value={1} />
                    <Picker.Item label="超高浓度" value={2} />
                </Picker>
            </View>
            </ScrollView>
            
        </SafeAreaView>
    )
    /**
     *
     */
}
const styles=StyleSheet.create({
    picker:{
        flexDirection:'row',
        marginTop:30,
        justifyContent:'center',
    },
    container:{
        margin:15,
        justifyContent:'center',
        flexDirection:'row',
        alignSelf:"center"
    },
    text:{
        justifyContent:'center',
        textAlignVertical:'center',
    },
    textInput:{
        margin:10,
        marginLeft:20,
        marginTop:0,
        borderWidth:1
    },
    button:{
        marginTop:0,
        margin:10
    }
})
export default DeviceControlScreen;