const { string, ref, required } = require('joi')
const mongoose =require('mongoose')
const foodSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    discription:{
        type:String,
        required:[true,'description is required']
    },
    price:{
        type:String,
        required:[true,'price is required']
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
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
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
