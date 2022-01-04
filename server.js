const express = require('express');

const path = require('path');
const db = require('./database/connect');

const app = express();

app.set("view engine", "ejs")

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));
// app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
// app.use('/images', express.static(path.resolve(__dirname, "assets/images")))

app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/',require('./routes/route'));
app.use('/auth', require('./routes/auth'));

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})
