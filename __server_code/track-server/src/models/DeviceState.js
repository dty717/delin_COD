const mongoose = require('mongoose');


const deviceStateSchema = new mongoose.Schema({
    deviceID:{
        type:String,
        required:true,
        unique:true
    },
    deviceState:{
        type:Array,
        require:true
    },
    lastHistory:{
        type:Date
    },
    lastUpdate:{
        type:Date
    },
    lastParam:{
        type:Date
    }
})

mongoose.model('DeviceState', deviceStateSchema);
