import trackerApi from '../api/tracker';
import createDataContext from './createDataContext'
import "../navigationRef"
import { navigate } from '../navigationRef';

import {AsyncStorage} from 'react-native'


var storage;
if(typeof AsyncStorage=='undefined'){
    storage = localStorage;
}else{
    storage = AsyncStorage
}
const DeviceReducer = (state,action)=>{
    
    switch(action.type){
        case 'updateDeviceData':
            return {...state,data:action.payload.data};
        case 'add_error':
            return{...state,errorMessage:action.payload}
        case 'signup':
            return {errorMessage:"",token:action.payload}
        case 'signin':
            return {errorMessage:"",token:action.payload}
        case 'signout':
            return {errorMessage:""};
        case 'clear_error_message':
            return {...state,errorMessage:""};
        default:
            return state;
    }
};

const updateDeviceData = (dispatch) => async (data) => {
    try {
        dispatch({ type: 'updateDeviceData', payload: {data} });
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const signup = (dispatch) => async ({ username, password }) => {
    try {
        const response = await trackerApi.post('/signup', { username, password });
        await storage.setItem(
            'token',
            response.data.token
        );
        dispatch({ type: 'signup', payload: response.data.token })
        navigate('TrackList');
    } catch (error) {
        dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const signin = (dispatch)=> async ({ username, password }) => {
    try {
        const response = await trackerApi.post('/signin', { username, password });

        await storage.setItem(
            'token',
            response.data.token
        );
        dispatch({ type: 'signin', payload: response.data.token})
        navigate('TrackList');
    } catch (error) {
        dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

const signout = (dispatch)=>{
    return async ()=>{
        await storage.removeItem('token');
        dispatch({type:'signout'});
        navigate('loginFlow')
    };
}

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' })
}

const tryLocalSignin = (dispatch)=>()=>{
    const token =storage.getItem('token');
    if(token){
        dispatch({type:'signin',payload:token});
        navigate('主页')
    }else{
        navigate('loginFlow')
    }
}

export const {Provider,Context} = createDataContext(
    DeviceReducer,
    {signin,signup,signout,clearErrorMessage,tryLocalSignin,updateDeviceData},
    {data:{dataFlow1:["1,1","2,2","3,3"],dataFlow2:["1,1","2,2","3,3"],dataFlow3:["1,1","2,2","3,3"]}}
)
