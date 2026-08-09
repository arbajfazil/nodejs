const express = require("express");
const urlRoutes = require("./routes/url")
const {connectToMongoDb} = require("./connect")
const app = express();

const port = 8001;
connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongodb connected"))

app.use(express.json())
app.use('/url',urlRoutes)
app.listen(port,()=>console.log(`server started at PORT ${port}`))