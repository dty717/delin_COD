import React from 'react'
import { useContext } from 'react'
import { FlatList } from 'react-native'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import DeviceStateDate from '../components/DeviceStateDate'
import Spacer from '../components/Spacer'

const DeviceInfoScreen = () => {
    var list = [1, 2, 3, 4, 1, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 4, 1, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 4, 1, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 41, 2, 3, 4]
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
            <FlatList data={list} renderItem={({ item }) => {
                return <DeviceStateDate 名称="名称" 状态="状态">
                </DeviceStateDate>
            }}>

            </FlatList>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({});

export default DeviceInfoScreen;