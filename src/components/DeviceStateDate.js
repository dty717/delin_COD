import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Spacer from './Spacer'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native-elements'


const DeviceStateDate = ({ 名称, 状态,header}) => {
    return (
        <View style={header?styles.containerHeader:styles.container}>
            <View style={styles.col1}>
                <Text style={header?styles.textHeader:styles.text}>{名称}</Text>
            </View>
            <View style={styles.col2}>
                <Text style={header?styles.textHeader:styles.text}>{状态}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        
        marginTop: 2
    },
    container: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: 2,
        borderTopWidth:1        
    },
    textHeader:{
        fontSize: 24
    },
    text:{
        fontSize: 20
    },
    col1: {
        margin: 1,
        width: 120,
        flex:1
    },
    col2: {
        margin: 1,
        width: 120,
        flex:1
    },
    

})

export default DeviceStateDate