const http = require("http");
const fs = require("fs");
const url = require("url")

const myServer = http.createServer((req,res)=>{
    if(req.url==='/favicon.ico') return res.end()
    
    const log = `${Date.now()} : ${req.url} New Request Received \n`;
    const myUrl = url.parse(req.url,true)
    console.log(myUrl)
    fs.appendFile("log.txt",log,(err,data)=>{
        res.end('hello from server');
    })
    switch(myUrl.pathname){
        case '/':
            res.end("home page");
        break
        case '/about':
            const username = myUrl.query.myname
            res.end(`Hi, ${username}`)
        
        break
        case '/contacts':res.end("this is contact us page")
        break
        case '/search':
            const search = myUrl.query.search_query;
            res.end("here are your result for " + search)
        default:
            res.end("404 Not Found")
    }
})

myServer.listen(8000,()=>console.log('server started'))