import trackerApi from '../api/tracker';
import createDataContext from './createDataContext'
import "../navigationRef"
import { navigate } from '../navigationRef';
import { AsyncStorage } from 'react-native';
var  {setLoginState} = require('../common/config')

var storage;
if(typeof AsyncStorage=='undefined'){
    try {
        storage = localStorage;
    } catch (error) {
        storage = AsyncStorage
    }
}else{
    storage = AsyncStorage
}

import { NativeModules } from 'react-native';

const { TokenModule } = NativeModules;

var pid = "";
var pType = "";
if(TokenModule){
  var constants = TokenModule.getConstants();
  if(constants){
    if(constants.pid&&constants.pType){
      pid = constants.pid;
      pType = constants.pType;
    }
  }
}

const authReducer = (state,action)=>{
    switch(action.type){
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

const signup = (dispatch) => async ({ username, password }) => {
    try {
        const response = await trackerApi.post('/signup', { username, password,pid,pType });
        await storage.setItem(
            '@token',
            response.data.token
        );
        setLoginState(true)
        dispatch({ type: 'signup', payload: response.data.token })
        navigate('TrackList');
    } catch (error) {
        dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}


const signin = (dispatch)=> async ({ username, password }) => {
    try {
        const response = await trackerApi.post('/signin', { username, password,pid,pType});
        await storage.setItem(
            '@token',
            response.data.token
        );
        setLoginState(true)
        dispatch({ type: 'signin', payload: response.data.token})
        navigate('主页');
    } catch (error) {
        dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}
const signout = (dispatch)=>{
    return async ()=>{
        await storage.removeItem('@token');
        setLoginState(false)
        dispatch({type:'signout'});
        navigate('loginFlow')
    };
}
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' })
}

const tryLocalSignin = (dispatch)=>async()=>{
    var token =await storage.getItem('@token');
    token = JSON.stringify(token);
    if((token)&&(token.toLowerCase()!="null")&&(token.toLowerCase()!="undefined")){
        setLoginState(true)
        dispatch({type:'signin',payload:token});
        navigate('主页')
    }else{
        navigate('loginFlow')
    }
}


export const {Provider,Context} = createDataContext(
    authReducer,
    {signin,signup,signout,clearErrorMessage,tryLocalSignin},
    {token:null,errorMessage:''}
)