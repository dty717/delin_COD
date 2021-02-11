const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    deviceID:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        required:true
    },
    sampleInfo:{
        type:String,
        required:true
    },
    sampleId:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    tubeId:{
        type:Number,
        required:true
    },
    vol:{
        type:Number,
        required:true
    },
    COD:{
        type:Number,
        required:true
    },
    quickV:{
        type:Number,
        required:true
    },
    slowTime:{
        type:Number,
        required:true
    },
    dataInfo:{
        type:String,
        required:true
    }

})

mongoose.model('History',historySchema);