import React from 'react'
import {View,StyleSheet, TextInput} from "react-native"
import { Button, Text } from 'react-native-elements'

const 质控样样式 = ({text,textInput,textInputChange,buttonText,buttonColor,buttonCall})=>{
    return (<View style ={styles.container}>
        <View style = {styles.text}>
            <Text style={{fontSize:18}}>{text}</Text>
        </View>
        
        <TextInput  style={styles.textInput} value ={textInput} onChangeText={textInputChange}  />
        <View style = {styles.text}>
            <Text style={{fontSize:18}}>{text}</Text>
        </View>
        <TextInput  style={styles.textInput} value ={textInput} onChangeText={textInputChange}  />
        <View style={styles.button}>

        {buttonColor?
            <Button title={buttonText} onPress={buttonCall} buttonStyle = {{backgroundColor:buttonColor}}></Button>
            :<Button title={buttonText} onPress={buttonCall}></Button>
        }
        </View>
    </View>)
}
const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-around',
        flex:1
    },
    text:{
        justifyContent:'center',
        textAlignVertical:'center',
        marginHorizontal:2,
    },
    textInput:{
        borderWidth:2,
        fontSize:17,
        alignContent:'center',
        flexDirection:'column',
        width:70,
        paddingHorizontal:4,
        alignSelf:"center"
    },
    button:{
        marginHorizontal:4
    }
})

export default 质控样样式