const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config({path:'../../.env'})
require("dotenv").config()
const db=mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password:"",
    database:process.env.DATABASE,
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Connected")
    }

})
module.exports = db