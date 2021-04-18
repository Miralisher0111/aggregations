const express=require('express');
const bodyParser=require('body-parser');
const path=require('path')
const indexRouter=require('./router/index')
const app=express();
require('./helper/db')();
// setting views engine
app.set('view engine','pug');
app.set('views',path.join(__dirname,"views"))
// setting public 
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',indexRouter)
app.listen(3000,()=>{
    console.log("Server working with 3000-port");
})