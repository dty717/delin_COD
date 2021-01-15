import {AsyncStorage} from 'react-native'
import trackerApi from '../api/tracker';
import createDataContext from './createDataContext'
import "../navigationRef"
import { navigate } from '../navigationRef';

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
var _AsyncStorage;
if(typeof AsyncStorage=='undefined'){
    _AsyncStorage = localStorage;
}else{
    _AsyncStorage = AsyncStorage
}

const signup = (dispatch) => async ({ username, password }) => {
    try {
        const response = await trackerApi.post('/signup', { username, password });
        await _AsyncStorage.setItem(
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

        await _AsyncStorage.setItem(
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
        await _AsyncStorage.removeItem('token');
        dispatch({type:'signout'});
        navigate('loginFlow')
    };
}
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' })
}

const tryLocalSignin = (dispatch)=>()=>{
    const token =_AsyncStorage.getItem('token');
    if(token){
        dispatch({type:'signin',payload:token});
        navigate('TrackList')
    }else{
        navigate('loginFlow')
    }
}

export default _AsyncStorage 

export const {Provider,Context} = createDataContext(
    authReducer,
    {signin,signup,signout,clearErrorMessage,tryLocalSignin},
    {token:null,errorMessage:''}
)