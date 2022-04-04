const mongoose=require('mongoose')
Schema = mongoose.Schema;


var userSchema = new Schema({
    transaction_from: { type: String, required: true,},
    transaction_to : { type: String,required:true },
    transaction_value :{ type: String,required: true},
    transaction_hash :{type: String,required: true},
    
},{timestamps:true});



module.exports=mongoose.model('transactions',userSchema)