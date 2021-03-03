const express = require('express');
const mongoose = require('mongoose');

const Param = mongoose.model('Param');

const router = express.Router();

const  {clients,send,sleep} = require('../middlewares/server')

router.all('/Params', async (req, res) => {
  //const tracks = await Param.find({ userId: req.user._id });
  try {
    var { deviceID} = req.body;
    console.log(req.body)
    const results = await Param.findOne( {deviceID });
    res.send(results);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.all('/uploadParamData',async(req,res)=>{
  try {
    var { deviceID,key,value} = req.body;
    console.log(value+"")
    value = (value+"").replace(/false/g, "False").replace(/true/g, "True");
    var sendState = send(deviceID,"set",{key,value});
    var originData = {};
    if(sendState==-1||(sendState==-2)){
      const results = await Param.findOne( {deviceID });
      originData[key] = results[key];
    }
    switch (sendState) {
      case -1:
        res.send({state:"error",info:"设备未连接",originData});
        break;
      case -2:
        res.send({state:"error",info:"设备繁忙",originData});
        break;
      default:
        res.send({ state: "success" })
        break
    }
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
})
module.exports = router;
