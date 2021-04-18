const mongoose=require('mongoose');
const Schema=mongoose.Schema

const people=new Schema({
    name:{
        type:String,
        required:true,
        default:"Somebody"
    },
    surname:{
        type:String,
        required:true,
        default:"Somebody"
    },
    age:{
        type:Number,
        required:true,
        default:10
    },
})
module.exports=mongoose.model("people",people)