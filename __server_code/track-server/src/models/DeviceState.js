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
    }

})

mongoose.model('DeviceState', deviceStateSchema);
