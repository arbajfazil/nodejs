const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;
const userRouter = require('./routes/user')
const {logReqRes} = require("./middlewares")
const {connectMongoDb}= require("./connection")

//3....connecting mongoose
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=>console.log("mongoDb connected"))



app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(logReqRes('log.txt'))

app.get('/test',(req,res)=>{
    return res.end(`<h1>hello</h1>`)
})
//routes
app.use("/api/users",userRouter)
app.listen(port,()=>console.log("server started"));