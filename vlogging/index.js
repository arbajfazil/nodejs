const express = require("express")
const path = require("path")
const userRoute= require("./routes/user")
const mongoose = require('mongoose')
const app = express();
const   PORT =  8000;

mongoose.connect('mongodb://localhost:27017/blogflog').then(e=>console.log("mongodb connected"))

app.set('view engine','ejs')
app.set("views" ,path.resolve('./views'))

app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("home")
})

app.use(express.urlencoded({ extended: false }));
app.use('/user',userRoute)
app.listen(PORT,()=>console.log(`server started at PORT : ${PORT}`))