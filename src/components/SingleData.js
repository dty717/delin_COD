import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Spacer from './Spacer'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { Text } from 'react-native-elements'


const SingleData = ({ 时间, 送检样品, 样品标号, 水样状态, 消解管号, 滴定剂消耗量, COD值, 快速滴定体积, 慢速滴定时间, 备注 ,header}) => {
    return (

        <View style={header?styles.containerHeader:styles.container}>
            <View style={styles.col1}>
                <Text style={header?styles.textHeader:styles.text}>{时间}</Text>
            </View>
            <View style={styles.col2}>
                <Text style={header?styles.textHeader:styles.text}>{送检样品}</Text>
            </View>
            <View style={styles.col7}>
                <Text style={header?styles.textHeader:styles.text}>{COD值}</Text>
            </View>
            <View style={styles.col3}>
                <Text style={header?styles.textHeader:styles.text}>{样品标号}</Text>
            </View>
            <View style={styles.col4}>
                <Text style={header?styles.textHeader:styles.text}>{水样状态}</Text>
            </View>
            <View style={styles.col5}>
                <Text style={header?styles.textHeader:styles.text}>{消解管号}</Text>
            </View>
            <View style={styles.col6}>
                <Text style={header?styles.textHeader:styles.text}>{滴定剂消耗量}</Text>
            </View>

            <View style={styles.col8}>
                <Text style={header?styles.textHeader:styles.text}>{快速滴定体积}</Text>
            </View>
            <View style={styles.col9}>
                <Text style={header?styles.textHeader:styles.text}>{慢速滴定时间}</Text>
            </View>
            <View style={styles.col10}>
                <Text style={header?styles.textHeader:styles.text}>{备注}</Text>
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
        marginHorizontal: 1,
        width: 120
    },
    col2: {
        marginHorizontal: 1,
        width: 120
    },
    col3: {
        marginHorizontal: 1,
        width: 100
    },
    col4: {
        marginHorizontal: 1,
        width: 100
    },
    col5: {
        marginHorizontal: 1,
        width: 100
    },
    col6: {
        marginHorizontal: 1,
        width: 200
    },
    col7: {
        marginHorizontal: 1,
        width: 200
    },
    col8: {
        marginHorizontal: 1,
        width: 200
    },
    col9: {
        marginHorizontal: 1,
        width: 200
    },
    col10: {
        marginHorizontal: 1,
        width: 200
    },

})

export default SingleData