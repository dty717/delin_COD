import React from 'react'
import {Text,TouchableOpacity} from 'react-native'
import Spacer from './Spacer'
import 'react-navigation'
import { StyleSheet } from 'react-native'


const NavLink = ({ navigation, text, routeName }) => {
    return (<TouchableOpacity onPress={() => { navigation.navigate({ routeName }) }}>
        <Spacer>
            <Text style={styles.link}>
                {text}
            </Text>
        </Spacer>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link:{
        color:'blue'
    }
})

export default NavLink