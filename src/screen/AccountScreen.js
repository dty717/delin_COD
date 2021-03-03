import React from 'react'
import { useContext } from 'react'
import {View,StyleSheet,Text} from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import {Context as AuthContext} from "../context/AuthContext"

const AccountScreen = ()=>{
    const {signout} = useContext(AuthContext);
    return (
        <SafeAreaView forceInset={{top:'always'}} style={{flex:1,justifyContent:'center'}}>
            <Spacer>
                <Text style={{fontSize:48,marginBottom:60,textAlign:"center"}}>账号</Text>
                <Button title="退出登录" onPress = {signout} />
            </Spacer>
        </SafeAreaView>
    )
}
const styles= StyleSheet.create({});

export default AccountScreen;