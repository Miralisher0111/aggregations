const express=require('express');
const router=express.Router();
const People=require('../model/People')
router.get('/',(req,res,next)=>{
    People.find({},(err,data)=>{
        if(err){
            console.log(err);
        }
        res.json(data)
    })
})
router.post('/',(req,res,next)=>{
    const {name,surname,age}=req.body
    const people=new People({
        name:name,
        surname:surname,
        age:parseInt(age)
    }).save()
    .catch(err=>console.log(err))
    .then((data)=>{
        res.json(data)
    }) 
})
// aggregations

router.get('/aggregation/match',async(req,res,next)=>{
   await People.aggregate([{
        $match:{
            name:"Alisher", 
        }
    }],(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data)
        }
    }) 
}),
router.get('/aggregation/limit',async(req,res,next)=>{
 await People.aggregate([{
     $limit:2
 }],(err,data)=>{
     if(err){
         console.log(err);
     }
     else{
         res.json(data)
     }
 })
}),

router.get('/aggregation/skip',async(req,res,next)=>{
 await People.aggregate([{
     $skip:2
 }],(err,data)=>{
     if(err){
         console.log(err);
     }
     else{
         res.json(data)
     }
 })
}),
router.get('/aggregation/groupsum',async(req,res,next)=>{
    await People.aggregate([{
       $group:{_id:'$age',jami:{$sum:1}}
    }],(err,data)=>{
        if(err){
            console.log(data);  // bunda   gruppirovkada nechtadan element borligini qaytaradi
        }
        else{
            res.json(data)
        }
    })
    
})
router.get('/aggregation/project',async (req,res,next)=>{
await People.aggregate([{
    $project:{
        name:1,
        age:1
    }
}],(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data)
        }
    })
})
router.get('/group',async(req,res,next)=>{
    const promise=await People.aggregate([
        {$group:{_id:'$age'}}  
    ],(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data)   // bunda shunchaki gruppirovka qib qaytaradi
        }
    })
    
}),

router.get('/aggregation/betwen/:id_start/:id_end',async(req,res,next)=>{
    const { id_start,id_end}=req.params
    await People.find({
        age:{
            '$gte':(id_start),
            '$lte':(id_end),
        }
    },(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data)
        }
    })
})



module.exports=router