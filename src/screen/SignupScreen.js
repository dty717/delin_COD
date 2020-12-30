import React,{useState} from 'react'
import {View,StyleSheet} from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import Spacer from '../components/Spacer'

const SignupScreen = ({navigation})=>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    return (
        <View style={styles.container}>
        <Spacer>
            <Text h3>登录德林COD系统平台</Text>
        </Spacer>
        <Input 
            label="用户名"
            value={username}
            onChangeText = {setUsername}
            autoCapitalize = "none"
            autoCorrect = {false}></Input>
        <Input
            secureTextEntry
            label="密码"
            value={password}
            onChangeText = {setPassword}
            autoCapitalize = "none"
            autoCorrect = {false}></Input>
        <Button title="Go to Sign in" onPress={()=>navigation.navigate("Signin")}></Button>
        <Button title="Go to main flow" onPress={()=>navigation.navigate("mainFlow")}></Button>
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        borderColor:'red',
        borderWidth:1,
        flex:1,
        justifyContent:"center",
        marginBottom:200
    }
});
/*
SignupScreen.navigationOptions=()=>{
    return {
        headerShown: false,
        
    };
}
*/
export default SignupScreen;