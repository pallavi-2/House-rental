const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config({path:'../../.env'})
require("dotenv").config()
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"",
    database:'rental',
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Connected")
    }

})
module.exports = db