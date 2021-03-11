import React, { useCallback, useRef, useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import {Context as AuthContext }from '../context/AuthContext'
import {Context as ParamContext }from '../context/ParamContext'
import {Context as DeviceContext }from '../context/DeviceContext'
import {Context as HistoryContext }from '../context/HistoryContext'
import { AsyncStorage } from 'react-native';
import firebase from 'firebase'
import trackerApi from '../api/tracker';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

if (Constants.isDevice) {
    if (Platform.OS == 'ios') {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
    }
}


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


var {getLoginState,setPid_And_PTtye} = require('../common/config');

var _updateDeviceData;
var updateDeviceTimer = 0
var lastHistory =new Date(0);
var lastParam = new Date(0);
const ResolveAuthScreen = ()=>{
    const {tryLocalSignin} = useContext(AuthContext);
    const {initParam,getParamData} = useContext(ParamContext);
    const {state,updateDeviceData} = useContext(DeviceContext);
    const {updateHistoryData} = useContext(HistoryContext);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(()=>{
        if(Constants.isDevice){
            if (Platform.OS == 'ios') {
                registerForPushNotificationsAsync().then(token => {
                  setPid_And_PTtye(token,"ios")
                });
                // This listener is fired whenever a notification is received while the app is foregrounded
                notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                    setNotification(notification);
                });
                // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
                responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                    console.log(response);
                });
            }
        }
        

        // useEffect(()=>{
        //     async function res(){
        //         return response = await trackerApi.post('/Historys',{deviceID:"COD_A_00001",time:new Date()});
        //     }
        //     console.log(res());
        //     //_updateDeviceData(response.data.deviceState);
        // })
        var deviceID = "COD_A_00001";
        // var time = new Date();
        // updateHistoryData("COD_A_00001",time);
        
        storage.getItem("@param",(err,res)=>{
            // firebase.initializeApp({
            //     apiKey: "AIzaSyBhWBoxP-CsBV_PbD0iH68w9-5V6W87x04",
            //     authDomain: "delincod.firebaseapp.com",
            //     projectId: "delincod",
            //     storageBucket: "delincod.appspot.com",
            //     messagingSenderId: "865920726070",
            //     appId: "1:865920726070:web:52d64e086642a7b6549497",
            //     measurementId: "G-2W2MN0E83B"
            //   })
            initParam(res);
            //getParamData("COD_A_00001");
            clearInterval(updateDeviceTimer)
            updateDeviceTimer = setInterval(async()=>{
                if(!getLoginState()){
                  return
                }
                const response = await trackerApi.get('/getDeviceState');

                if(lastParam<new Date(response.data.lastParam)){
                  getParamData("COD_A_00001");
                }
                lastParam = new Date(response.data.lastParam)
                if(lastHistory<new Date(response.data.lastHistory)){
                    updateHistoryData("COD_A_00001",response.data.lastHistory);
                }
                lastHistory=new Date(response.data.lastHistory)
                updateDeviceData(response.data);
            },5000)
            tryLocalSignin();
        });
        _updateDeviceData = updateDeviceData;
    },[state]);
    return null;
}


  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

export default ResolveAuthScreen
