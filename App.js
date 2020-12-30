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

const switchNavigator = createSwitchNavigator({

  loginFlow:createStackNavigator({
    Signup:SignupScreen,
    Signin:SigninScreen
  }),
  mainFlow:createBottomTabNavigator({
    trackListFlow:createStackNavigator({
      TrackList:TrackListScreen,
      TrackDetail:TrackDetailsScreen
    }),
    TrackCreate:TrackCreateScreen,
    Account:AccountScreen
  })
})

const App = createAppContainer(switchNavigator);
export default ()=>{
  return (
   <AuthProvider>
      <App/>
    </AuthProvider>
  )
}