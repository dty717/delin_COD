import trackerApi from '../api/tracker';
import createDataContext from './createDataContext'
import "../navigationRef"
import { navigate } from '../navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        const response = await trackerApi.post('/signup', { username, password });
        await storage.setItem(
            '@token',
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
            '@token',
            response.data.token
        );
        const token2 =JSON.stringify(await storage.getItem('@token'));
        dispatch({ type: 'signin', payload: response.data.token})
        navigate('主页');
    } catch (error) {
        dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}
const signout = (dispatch)=>{
    return async ()=>{
        await storage.removeItem('@token');
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
        dispatch({type:'signin',payload:token});
        navigate('设备信息')
    }else{
        navigate('loginFlow')
    }
}


export const {Provider,Context} = createDataContext(
    authReducer,
    {signin,signup,signout,clearErrorMessage,tryLocalSignin},
    {token:null,errorMessage:''}
)