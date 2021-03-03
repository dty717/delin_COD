const express = require('express');
const mongoose = require('mongoose');
const DeviceState = mongoose.model('DeviceState');

const router = express.Router();

const  {clients,send,sleep,getClientStateInfo} = require('../middlewares/server')

router.get('/device', async (req, res) => {
    console.log(clients.length)
    res.send(clients)
});

router.get('/setDeviceState', async (req, res) => {
    var deviceID = "COD_A_00001";
    await DeviceState.updateOne(
        { deviceID },
        {
            $set: { deviceState: [12] }
        }
    );
    var tem = await DeviceState.find({ deviceID});

    res.send(tem);
    //await DeviceState.findById(data.deviceID);
})

router.all('/controlDevice', async (req, res) => {
    var { deviceID,content} = req.body;
    var sendState = send(deviceID,"control",{content});
    switch(sendState){
        case -1:
            res.send("{\"state\":\"设备未连接\"}");
            break;
        case -2:
            res.send("{\"state\":\"设备连接忙碌\"}");
            break;
        default:
            res.send({ state: "success" })
            break
    }
    
    // var times = 8;
    // while(times--){
    //     sendState = getClientState(deviceID,"control");
    //     if(sendState>=0){
    //         res.send("{\"state\":\"设置成功\"}");
    //         break;
    //     }
    //     await sleep(500);
    // }
    // res.send("{\"state\":\"设备未反应\"}");
})


router.get('/getDeviceState', async (req, res) => {
    var deviceID = "COD_A_00001";

    var tem = await DeviceState.find({
        deviceID
    });

    if(tem.length>0){
        res.send({...tem[0].toObject(),...getClientStateInfo(deviceID)});
    }
    else{
        res.send("{\"state\":\"error\"}");
    }
})

module.exports = router;
