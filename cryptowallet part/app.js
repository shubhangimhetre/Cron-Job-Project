const express=require('express');
const app=express();
const port=3000;
const bodyparser=require('body-parser');
var Web3 = require('web3')
const web1=require('./routes/web')
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
const mongoose=require('mongoose')
const DB="mongodb+srv://shubhangimhetre:Shubhangi_123@cluster0.r59gp.mongodb.net/Mydb2?retryWrites=true&w=majority"

mongoose.connect(DB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{console.log('connected to database.. ') })
.catch((err)=>{ console.log(err)})

app.use('/',web1)


app.listen(port,()=>{
    console.log(`server listening at port ${port}`)
})

