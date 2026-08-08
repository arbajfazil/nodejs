const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },lastName:{
        type:String,
    },email:{
        type:String,
        required:true,
        unique:true,
    },jobTitle:{
        type:String,
    },gender:{
        type:String,
    },
},{timestamps:true})

//2....model
const user = mongoose.model('user',userSchema);

//export
module.exports=user;
