const express = require("express");
const path = require("path")
const cookieParser = require("cookie-parser")
const {connectToMongoDb} = require("./connect")
const URL = require("./models/url");
const app = express();
const {restrictToLoggedinUserOnly} = require("./middleware/auth")

const urlRoutes = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const port = 8001;
connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongodb connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))
app.use(express.json())

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});

    return res.render("home", {
        urls: allUrls
    });
});
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use('/url',restrictToLoggedinUserOnly,urlRoutes)
app.use('/',staticRoute)
app.use('/user',userRoute)

app.get('/:shortid',async(req,res)=>{
    const shortId = req.params.shortid;
    const entry= await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now()
        }
    }})
    if (!entry) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }
    res.redirect(entry.redirectURL)
})
app.listen(port,()=>console.log(`server started at PORT ${port}`))