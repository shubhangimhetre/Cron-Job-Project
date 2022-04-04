const express=require('express');
const app=express();
const port=3000;
const bodyparser=require('body-parser');
const mongoose=require('mongoose')
const web1=require('./routes/web')
const DB="mongodb+srv://shubhangimhetre:Shubhangi_123@cluster0.r59gp.mongodb.net/Mydb?retryWrites=true&w=majority"


app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use('/student',web1)

mongoose.connect(DB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{console.log('connected to database..') })
.catch((err)=>{ console.log(err)})

app.get('/',(req,res)=>{
    res.send('Hello world')
})


app.listen(port,()=>{
    console.log(`server listening at port ${port}`)
})