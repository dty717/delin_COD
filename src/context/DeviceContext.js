import trackerApi from '../api/tracker';
import createDataContext from './createDataContext'
import "../navigationRef"
import { navigate } from '../navigationRef';
import { AsyncStorage } from 'react-native';

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

const DeviceReducer = (state,action)=>{
    switch(action.type){
        case 'updateDeviceData':
            return {...state,...action.payload};
        case 'add_error':
            return{...state,errorMessage:action.payload}
        case 'clear_error_message':
            return {...state,errorMessage:""};
        case 'controlDevice':
            return {...state,errorMessage:action.payload}
        default:
            return state;
    }
};

const updateDeviceData = (dispatch) => async (deviceState) => {
    try {
        dispatch({ type: 'updateDeviceData', payload: deviceState });
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}
const controlDevice = (dispatch) => async(deviceID,content)=>{
    try {
        var response = await trackerApi.post('/controlDevice',{deviceID,content});
        if(response.data.state=="error"){
            dispatch({ type: 'uploadParamData', payload: response.data.originData });
            alert(response.data.info);
        }else{
            alert('设备发送中')
        }
        dispatch({ type: 'controlDevice', payload: response.data.state });
    } catch (error) {
        //dispatch({ type: 'add_error', payload: 'Something went wrong!' })
    }
}

export const {Provider,Context} = createDataContext(
    DeviceReducer,
    {updateDeviceData,controlDevice},
    {data:{dataFlow1:["1,1","2,2","3,3"],dataFlow2:["1,1","2,2","3,3"],dataFlow3:["1,1","2,2","3,3"]},deviceState:[],lastUpdate:false,lastHistory:false,lastParam:false}
)
