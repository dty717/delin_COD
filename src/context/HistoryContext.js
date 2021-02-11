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

const HistoryReducer = (state,action)=>{
    switch(action.type){
        case 'updateHistoryData':
            return {...state,historyData:action.payload};
        case 'add_error':
            return{...state,errorMessage:action.payload}
        case 'clear_error_message':
            return {...state,errorMessage:""};
        default:
            return state;
    }
};

const updateHistoryData = (dispatch) => async (deviceID,time) => {
    try {
        var response = await trackerApi.post('/Historys',{deviceID,time});
        dispatch({ type: 'updateHistoryData', payload: response.data });
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}


export const {Provider,Context} = createDataContext(
    HistoryReducer,
    {updateHistoryData},
    {historyData:[]}
)
