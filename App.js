import React from 'react'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from "./src/screen/AccountScreen";
import SigninScreen from "./src/screen/SigninScreen";
import SignupScreen from "./src/screen/SignupScreen";
import {Provider as AuthProvider} from "./src/context/AuthContext"
import {Provider as DeviceProvider} from "./src/context/DeviceContext"
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screen/ResolveAuthScreen';
import MainScreen from './src/screen/MainScreen';
import DeviceControlScreen from './src/screen/DeviceControlScreen';
import HistoryScreen from './src/screen/HistoryScreen';
import DeviceInfoScreen from './src/screen/DeviceInfoScreen';
import {Provider as ParamProvider} from "./src/context/ParamContext"

const switchNavigator = createSwitchNavigator({
  resolveAuth:ResolveAuthScreen,
  loginFlow:createStackNavigator({
    Signin:SigninScreen,
    Signup:SignupScreen
  }),
  mainFlow:createBottomTabNavigator({
    主页:MainScreen,
    设备调试:DeviceControlScreen,
    历史数据:HistoryScreen,
    设备信息:DeviceInfoScreen,
    账号:AccountScreen
  })
})

const App = createAppContainer(switchNavigator);
export default ()=>{
  return (
   <AuthProvider>
     <ParamProvider>
      <DeviceProvider>
        <App ref={(navigator)=>{setNavigator(navigator)}} style = {{flex:1}}/>
      </DeviceProvider>
     </ParamProvider>
    </AuthProvider>
  )
}