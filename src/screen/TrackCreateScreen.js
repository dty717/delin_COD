import React, { useEffect, useState } from 'react'
import {View,StyleSheet} from 'react-native'
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import {requestPermissionsAsync} from 'expo-location';
import Map from '../components/Map';
const TrackDetailsScreen = ()=>{
    const [err,setErr] = useState(null);
    const startWatching = async()=>{
        try {
            await requestPermissionsAsync();
        } catch (e) {
            setErr(e);
        }
    }

    useEffect(()=>{
        startWatching();
    },[]);
    return (
        <SafeAreaView forceInset={{top:'always'}}>
            <Text h2>TrackDetails Screen</Text>
            <Map />
            {err?<Text>Please enable location services</Text>:null}
        </SafeAreaView>
    )
    
    //
}
const styles= StyleSheet.create({});

export default TrackDetailsScreen;