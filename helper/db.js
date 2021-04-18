const mongoose=require('mongoose');
const db=mongoose.connection
module.exports=()=>{
    mongoose.connect('mongodb://localhost:27017/people',{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    db.on('error',(err)=>{
        console.error('bazaga ulanishda xatolik yuz berdi',err)
    })
    db.on('open',()=>{
        console.log("localhost:27017 connected");
    })

}