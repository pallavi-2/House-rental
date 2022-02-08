const express = require("express")
const router = express.Router()
const authController = require('../controller/control');
const db = require("../database/connect");

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/search',authController.search)

router.get('/viewproperties',authController.properties)

router.get('/login',(req,res)=>{
    res.render('login',{message:""})
})

router.get('/signup',(req,res)=>{
    res.render('signup',{message:""})
router.get('/auth/signup',(req,res)=>{
        res.render('signup',{message:""})
    })
})

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('login')
})

module.exports = router;