import React from 'react'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from "./src/screen/AccountScreen";
import SigninScreen from "./src/screen/SigninScreen";
import SignupScreen from "./src/screen/SignupScreen";
import TrackListScreen from "./src/screen/TrackListScreen";
import TrackCreateScreen from "./src/screen/TrackCreateScreen";
import TrackDetailsScreen from './src/screen/TrackCreateScreen';
import {Provider as AuthProvider} from "./src/context/AuthContext"
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screen/ResolveAuthScreen';

const switchNavigator = createSwitchNavigator({
  resolveAuth:ResolveAuthScreen,
  loginFlow:createStackNavigator({
    Signin:SigninScreen,
    Signup:SignupScreen
  }),
  mainFlow:createBottomTabNavigator({
    trackListFlow:createStackNavigator({
      TrackList:TrackListScreen,
      TrackDetail:TrackDetailsScreen
    }),
    TrackCreate:TrackCreateScreen,
    账号:AccountScreen,
        

  })
})

const App = createAppContainer(switchNavigator);
export default ()=>{
  return (
   <AuthProvider>
      <App ref={(navigator)=>{setNavigator(navigator)}}/>
    </AuthProvider>
  )
}