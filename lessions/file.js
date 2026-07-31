const fs = require("fs");
//sync...
// fs.writeFileSync('./test.txt','another texts')

//async..
// fs.writeFile('./test.txt', 'this is af', (erroe)=>{})

//READING
// const contact = fs.readFileSync('./contact.txt','utf-8');
// console.log(contact)

//without sync..
// const contact = fs.readFile('./contact.txt','utf-8', (error,result)=>{
//     if(error){
//         console.log("error",error)
//     }else{
//         console.log(result)
//     }
// });

//append in file
// fs.appendFileSync('./test.txt', `Date is :${ new Date().getDate().toLocaleString()}\n`)

//length of my system cores
const os = require('os')
console.log(os.cpus().length)