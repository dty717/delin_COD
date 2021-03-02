import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import {Context as AuthContext }from '../context/AuthContext'
import {Context as ParamContext }from '../context/ParamContext'
import {Context as DeviceContext }from '../context/DeviceContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase'
import trackerApi from '../api/tracker';

var storage;
if(typeof AsyncStorage=='undefined'){
    try {
        storage = localStorage;
    } catch (error) {
        storage = AsyncStorage
    }
}else{
    storage = AsyncStorage
}

var index =0;
var _updateDeviceData;
var updateDeviceTimer = 0

const ResolveAuthScreen = ()=>{
    const {tryLocalSignin} = useContext(AuthContext);
    const {initParam,getParamData} = useContext(ParamContext);
    const {updateDeviceData} = useContext(DeviceContext);
    
    useEffect(()=>{ 
        storage.getItem("@param").then(e=>{
            // firebase.initializeApp({
            //     apiKey: "AIzaSyBhWBoxP-CsBV_PbD0iH68w9-5V6W87x04",
            //     authDomain: "delincod.firebaseapp.com",
            //     projectId: "delincod",
            //     storageBucket: "delincod.appspot.com",
            //     messagingSenderId: "865920726070",
            //     appId: "1:865920726070:web:52d64e086642a7b6549497",
            //     measurementId: "G-2W2MN0E83B"
            //   })
            initParam(e);
            getParamData("COD_A_00001");
            clearInterval(updateDeviceTimer)
            updateDeviceTimer = setInterval(async()=>{
                // if(_updateDeviceData){
                const response = await trackerApi.get('/getDeviceState');
                updateDeviceData(response.data.deviceState);
                // }
            },5000)
            tryLocalSignin();
        });
        _updateDeviceData = updateDeviceData;
    },[]);
    return null;
}

export default ResolveAuthScreen