import React from 'react'
import {View,StyleSheet,Text,Button} from 'react-native'

const TrackListsScreen = ({navigation})=>{
    return(
        <>
        <Text style={{fontSize:48}}>TrackLists Screen</Text>
        <Button title="Go To TrackDetails" onPress={()=>navigation.navigate("TrackDetail")}></Button>
        </>
    )
}
const styles= StyleSheet.create({});

export default TrackListsScreen;