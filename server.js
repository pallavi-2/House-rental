const express = require('express');
const path = require('path');
const db = require('./database/connect');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
require('dotenv').config();
app.set("view engine", "ejs")

app.use(fileupload())

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));
app.use('/css', express.static(path.resolve(__dirname, "public/css")))
app.use('/images', express.static(path.resolve(__dirname, "public/images")))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser());

app.use(session({ 
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 }
}))

app.use('/',require('./routes/route'));
app.use('/auth', require('./routes/auth'));

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})

module.exports = app;