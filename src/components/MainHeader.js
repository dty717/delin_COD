import React from 'react'
import {View,StyleSheet, TextInput} from "react-native"
import { Button, Text } from 'react-native-elements'

const MainHeader = ({})=>{
    return (
        <View>
        <View style={styles.row}>
            <View style = {styles.text}>
                <Text style={{fontSize:18}}>状态</Text>
            </View>
            <TextInput  style={styles.textInput} />
            <View style = {styles.text2}>
                <Text style={{fontSize:18}}></Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style = {styles.text}>
                <Text style={{fontSize:18}}>滴定数据</Text>
            </View>
            <TextInput  style={styles.textInput} />
            <View style = {styles.text2}>
                <Text style={{fontSize:18}}>mg/L</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style = {styles.text}>
                <Text style={{fontSize:18}}>蒸馏水光电压</Text>
            </View>
            <TextInput  style={styles.textInput} />
            <View style = {styles.text2}>
                <Text style={{fontSize:18}}></Text>
            </View>
        </View>
        </View>
    )
}
const styles=StyleSheet.create({
    row:{
        flexDirection:'row',
        marginTop:10,
    },
    text:{
        justifyContent:'flex-start',
        textAlignVertical:'center',
        marginHorizontal:20,
        flex:5
    },
    text2:{
        justifyContent:'flex-start',
        textAlignVertical:'center',
        marginHorizontal:10,
        flex:2
    },
    textInput:{
        borderWidth:1,
        fontSize:17,
        justifyContent:'flex-end',
        alignContent:'flex-end',
        width:70,
        paddingHorizontal:4,
        alignSelf:'flex-end',
        flex:5
    }
})

export default MainHeader

/*

<View style = {styles.stateBox}>
<View style={{flexDirection:"row"}}>
    <Text>状态</Text>
    <TextInput style={styles.input} ></TextInput>
</View>
<View style={{flexDirection:"row"}}>
    <Text>滴定数据</Text>
    <TextInput style={styles.input} ></TextInput>
    <Text>  mg/L</Text>
</View>
<View style={{flexDirection:"row"}}>
    <Text>蒸馏水光电压</Text>
    <TextInput style={styles.input} value={param.state.蒸馏水光电压}></TextInput>
</View>
</View>
<LineChart_data data1 = {state.data.dataFlow1} 
data2 = {state.data.dataFlow2} data3 = {state.data.dataFlow3}>
</LineChart_data>
*/