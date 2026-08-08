const user = require("../models/user")

async function handleGetAllUsers(req,res){
    const allDbUsers = await user.find({});
    return res.json(allDbUsers)
}
async function handleGetUserById(req,res){
    const userData = await user.findById(req.params.id) 
    return res.json(userData)
}
async function handleUpadateUserById(req,res){
    await user.findByIdAndUpdate(req.params.id,{lastName:"strange"})
    return res.json({status:"success"}) 
}
async function handleDeleteUserById(req,res){
    await user.findByIdAndDelete(req.params.id)
    return res.json({status:"success"}) 
}
async function handleCreateNewUser(req,res){
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
    return res.status(201).json({message:"success", id: result._id});
}
async function handleAllPut(req,res){
   const userData = await user.findByIdAndUpdate(req.params.id,req.body, { returnDocument: 'after' });

    if(!userData){
        return res.status(400).json({message:"user not found"})
    }

    return res.json(userData,{status:"success"});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpadateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
    handleAllPut,
}