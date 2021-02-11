import React, { useEffect } from 'react'
import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import HistoryTable from '../components/HistoryTable'
import SingleData from '../components/SingleData'
import Spacer from '../components/Spacer'
import {Context as HistoryContext }from '../context/HistoryContext'

const HistoryScreen = () => {
    const {state,updateHistoryData} = useContext(HistoryContext);
    

    // useEffect(()=>{
    //     async function res(){
    //         return response = await trackerApi.post('/Historys',{deviceID:"COD_A_00001",time:new Date()});
    //     }
    //     console.log(res());
    //     //_updateDeviceData(response.data.deviceState);
    // })
    useEffect(()=>{ 
        var deviceID = "COD_A_00001";
        var time = new Date();
        updateHistoryData(deviceID,time)
        //_updateDeviceData = updateDeviceData;
    },[]);


    return (
        <SafeAreaView forceInset={{ top: 'always' }} style = {{flex:1,marginTop:20}}>
            <HistoryTable list = {state.historyData}>

            </HistoryTable>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({});

export default HistoryScreen;