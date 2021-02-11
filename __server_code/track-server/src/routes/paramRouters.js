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
    var data = {};
    data[key]=value;
    
    
    var { deviceID,content} = req.body;
    send(deviceID,"set",key+":"+value);
    
    //console.log(data);
    await Param.updateOne(
        { deviceID },
        {
            $set: data
        }
    );
    const results = await Param.findOne( {deviceID });
    res.send(results);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
})
module.exports = router;
