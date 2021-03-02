import React,{useContext, useEffect, useState} from 'react'
import { FlatList, ScrollView } from 'react-native'
import {View,StyleSheet} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import Spacer from '../components/Spacer'
import SingleData from './SingleData'


const HistoryTable = ({list})=>{
    return (
        <View style={{flex:1}}>
        <Text h1>历史数据</Text>
            <ScrollView style={styles.container} horizontal>
                <View>
                    <SingleData header 时间="时间" 送检样品="送检样品" 样品标号="样品标号" 水样状态="水样状态" 消解管号="消解管号" 滴定剂消耗量="滴定剂消耗量" COD值="COD值" 快速滴定体积="快速滴定体积" 慢速滴定时间="慢速滴定时间" 备注="备注">
                    </SingleData>
                    <FlatList horizontal={false} data = {list} renderItem={({item})=>{
                        return <SingleData 时间={item.time} 送检样品={item.sampleInfo}  样品标号={item.sampleId} 水样状态={item.state} 消解管号={item.tubeId} 滴定剂消耗量={item.vol} COD值={item.COD} 快速滴定体积={item.quickV} 慢速滴定时间={item.slowTime} 备注={item.dataInfo}>
                        </SingleData>
                    }}>
                    </FlatList>
                </View>
            </ScrollView>
        </View>
)
}
const styles= StyleSheet.create({
    container: {
        margin:10,
        marginTop: 40,
        borderWidth: 3,
        flexDirection:"row",
        flex:1
    }
});

export default HistoryTable;