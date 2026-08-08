const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const strict = require("assert/strict");
const { type } = require("os");

//3....connecting mongoose
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log('mongoose connected'))
.catch((err)=>console.log("mongoose error..",err))

// 1....this is schema
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
},{timestamps:true}

)

//2....model
const user = mongoose.model('user',userSchema);

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    fs.appendFile("log.txt",`\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`,(err,data)=>{
        next();
    })
})
app.get('/users',async(req,res)=>{
    const allDbUsers = await user.find({})
    const html = `
    <ul>
        ${allDbUsers.map((user)=> `<li> ${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
  `
  res.send(html);
})

//REST API
app.get('/api/users',async(req,res)=>{
    const allDbUsers = await user.find({});
    return res.json(allDbUsers)
})
app.route('/api/users/:id')
.get(async(req,res)=>{
    const userData = await user.findById(req.params.id) 
    return res.json(userData)
})
.put((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id===id)
    if(!user){
        return res.status(404).json({message:'user not found'})
    }

    const body = req.body;
    Object.assign(user, body);

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if(err){
            return res.status(500).json({message:"something went wrong"})
        }
        return res.json({
            status: "success",
            user
        });
    })  
})
.patch(async(req,res)=>{
    await user.findByIdAndUpdate(req.params.id,{lastName:"moonlight"})
    return res.json({status:"success"}) 
})

.delete(async(req,res)=>{
    await user.findByIdAndDelete(req.params.id)
    return res.json({status:"success"}) 
})

app.post('/api/users',async(req,res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ){
        return res.status(400).json({message: "all fields are required"})
    }  
    const result = await user.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title
    })
    return res.status(201).json({message:"success"});
})
app.listen(port,()=>console.log("server started"));