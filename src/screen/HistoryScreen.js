import React from 'react'
import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import HistoryTable from '../components/HistoryTable'
import SingleData from '../components/SingleData'
import Spacer from '../components/Spacer'

const HistoryScreen = () => {
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style = {{flex:1,marginTop:20}}>
            <HistoryTable>

            </HistoryTable>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({});

export default HistoryScreen;