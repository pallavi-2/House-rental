const express = require("express")
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/signup',(req,res)=>{
    res.render('signup',{message:""})
})

router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

router.get('/rent',(req,res)=>{
    res.render('rent')
})

router.get('/viewproperties',(req,res)=>{
    res.render('viewproperties')
})

module.exports = router;