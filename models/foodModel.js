const { string, ref } = require('joi')
const mongoose =require('mongoose')
const foodSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    foodTags:{
        type:String
    },
    category:{
        type:String
    },
    code:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    retaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    }
},{timestamps:true})
module.exports=mongoose.model('foods',foodSchema)
