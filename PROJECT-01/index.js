const express = require("express");
let users = require("./MOCK_DATA.json")
const fs = require("fs");
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/users',(req,res)=>{
    const html = `
    <ul>
        ${users.map((user)=> `<li> ${user.first_name}</li>`).join("")}
    </ul>
  `
  res.send(html);
})

//REST API
app.get('/api/users',(req,res)=>{
    return res.json(users)
})
app.route('/api/users/:id')
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id===id)
    return res.json(user)
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

.delete((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id===id)
    if(!user){
        return res.status(404).json({message:'user not found'})
    }
    const newUsers = users.filter((user)=>{
        return user.id !== id;
    });

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(newUsers,null,2),(err)=>{
        if(err){
            return res.status(500).json({message:"something went wrong"})
        }
        return res.json({
            status: "success",
        });
    })

})

app.post('/api/users',(req,res)=>{
    const body = req.body;
    users.push({...body,id:users.length+1})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success", id:users.length})
    })
    
})
app.listen(port,()=>console.log("server started"));