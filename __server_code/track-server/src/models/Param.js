const mongoose = require('mongoose');

const paramSchema = new mongoose.Schema({
    I0:{type:Number,required:true},
    deviceID:{
        type:String,
        required:true
    },
    Ab:{type:Number,required:true},
    state:{type:Number,required:true},
    滴定数据:{type:Number,required:true},

    //Usercontroller2
     启用B组消解管:{type:Boolean,required:true},
    A组消解温度:{type:Number,required:true},
    A组消解时间:{type:Number,required:true},
    A组冷却温度:{type:Number,required:true},
    A组占空比:{type:Number,required:true},
    A1占空比:{type:Number,required:true},
    A2占空比:{type:Number,required:true},
    A3占空比:{type:Number,required:true},
    A4占空比:{type:Number,required:true},
    A5占空比:{type:Number,required:true},
    A6占空比:{type:Number,required:true},
    A7占空比:{type:Number,required:true},
    A8占空比:{type:Number,required:true},
    A9占空比:{type:Number,required:true},
    B组消解温度:{type:Number,required:true},
    B组消解时间:{type:Number,required:true},
    B组冷却温度:{type:Number,required:true},
    B组占空比:{type:Number,required:true},
    B1占空比:{type:Number,required:true},
    B2占空比:{type:Number,required:true},
    B3占空比:{type:Number,required:true},
    B4占空比:{type:Number,required:true},
    B5占空比:{type:Number,required:true},
    B6占空比:{type:Number,required:true},
    B7占空比:{type:Number,required:true},
    B8占空比:{type:Number,required:true},
    B9占空比:{type:Number,required:true},

    // Usercontroller3
    做样数量:{type:Number,required:true},
    消解管号:{type:Number,required:true},
    选择消解管号:{type:Array,required:true},
    消解管状态 :{type:Array,required:true},
    高浓度氧化剂质量分数:{type:Number,required:true},
    低浓度氧化剂质量分数:{type:Number,required:true},

    //Usercontroller6
     //设置
    Ag进样量:{type:Number,required:true},
    搅拌电机速度:{type:Number,required:true},
    水样进样量:{type:Number,required:true},
    Cr进样量:{type:Number,required:true},  
    Hg进样量:{type:Number,required:true},
    //P1
    P1中速速度:{type:Number,required:true},
    P1进样量:{type:Number,required:true},
    P1快速速度:{type:Number,required:true},
    P1慢速速度:{type:Number,required:true},
    P1预填水量:{type:Number,required:true},
    P1隔空气量:{type:Number,required:true},
    P1取试剂多余量:{type:Number,required:true},
    P1洗采样管量:{type:Number,required:true},
    P1洗储液环量:{type:Number,required:true},
    P1空气混合量:{type:Number,required:true},

    //Y1蠕动泵
    Y1蠕动泵快速速度:{type:Number,required:true},
    Y1蠕动泵慢速速度:{type:Number,required:true},

    //P2 P3
    P2_P3取滴定剂量:{type:Number,required:true},
    P2_P3快速速度:{type:Number,required:true},
    P2_P3慢速速度:{type:Number,required:true},

    //清洗
    清洗滴定罐取水量:{type:Number,required:true},
    清洗滴定罐排水量:{type:Number,required:true},
    清洗滴定罐次数:{type:Number,required:true},
    超级清洗进水量:{type:Number,required:true},
    超级清洗排水量:{type:Number,required:true},
    超级清洗次数:{type:Number,required:true},

    //other
    Y2搅拌电机速度:{type:Number,required:true},
    采样管量:{type:Number,required:true},
    
    //P2
    P2中速速度:{type:Number,required:true},
    P2进样量:{type:Number,required:true},
    P2快速速度:{type:Number,required:true},
    P2慢速速度:{type:Number,required:true},

    //P3
    P3中速速度:{type:Number,required:true},
    P3进样量:{type:Number,required:true},
    P3快速速度:{type:Number,required:true},
    P3慢速速度:{type:Number,required:true},

    //P4
    P4快速速度:{type:Number,required:true},
    P4慢速速度:{type:Number,required:true},

    //P5
    P5进样量:{type:Number,required:true},
    P5吸液速度:{type:Number,required:true},

    //P6
    水样稀释倍数:{type:Number,required:true},
    氧化剂稀释倍数:{type:Number,required:true},

    //Usercontroller7
    质控一标号:{type:Number,required:true},
    质控一浓度:{type:Number,required:true},
     质控一启用:{type:Boolean,required:true},
    质控二标号:{type:Number,required:true},
    质控二浓度:{type:Number,required:true},
     质控二启用:{type:Boolean,required:true},

    空白样数量:{type:Number,required:true},
    起始消解管号:{type:Number,required:true},
    起始采样号:{type:Number,required:true},

     使用Ag报警:{type:Boolean,required:true},
     使用Hg报警:{type:Boolean,required:true},
     使用指示剂报警:{type:Boolean,required:true},
     使用高浓度氧化剂报警:{type:Boolean,required:true},
     使用低浓度氧化剂报警:{type:Boolean,required:true},
     使用高浓度滴定剂报警:{type:Boolean,required:true},
     使用低浓度滴定剂报警:{type:Boolean,required:true},
     使用水样报警:{type:Boolean,required:true},
     使用蒸馏水报警:{type:Boolean,required:true},

     Hg空缺:{type:Boolean,required:true},
     低浓度Cr空缺:{type:Boolean,required:true},
     高浓度Cr空缺:{type:Boolean,required:true},
     高浓度滴定剂空缺:{type:Boolean,required:true},
     低浓度滴定剂空缺:{type:Boolean,required:true},
     Ag空缺:{type:Boolean,required:true},
     指示剂空缺:{type:Boolean,required:true},
     蒸馏水空缺:{type:Boolean,required:true},
     水样空缺:{type:Boolean,required:true},


    当前采样样品标号:{type:Number,required:true},

     dev:{type:String,required:true},

     脚本支持:{type:Boolean,required:true},

     启用高浓度Cr:{type:Boolean,required:true},

    采样运行模式:{type:Number,required:true},

    sampleStep:{type:Number,required:true},

    e:{type:Number,required:true},

    f:{type:Number,required:true},

    高浓度空白样体积:{type:Number,required:true},
    低浓度空白样体积:{type:Number,required:true},
    高浓度标定空白样体积:{type:Number,required:true},
    低浓度标定空白样体积:{type:Number,required:true},
    高浓度标定值:{type:Number,required:true},
    低浓度标定值:{type:Number,required:true},
    高浓度初始滴定光强:{type:Number,required:true},
    低浓度初始滴定光强:{type:Number,required:true},
    高浓度初始滴定光强2:{type:Number,required:true},
    低浓度初始滴定光强2:{type:Number,required:true},

    高浓度空白样偏移:{type:Number,required:true},
    低浓度空白样偏移:{type:Number,required:true},
     使用双光束:{type:Boolean,required:true},
     使用二维码:{type:Boolean,required:true},

    蒸馏水光电压:{type:Number,required:true},
    低浓度A_斜率:{type:Number,required:true},
    低浓度A_截距:{type:Number,required:true},

    低浓度_临界值:{type:Number,required:true},
    低浓度_快速体积:{type:Number,required:true},
    低浓度_最大体积:{type:Number,required:true},

    高浓度_临界值:{type:Number,required:true},
    高浓度_快速体积:{type:Number,required:true},
    高浓度_最大体积:{type:Number,required:true},
})

mongoose.model('Param',paramSchema);