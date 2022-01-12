const express = require("express")
const router = express.Router()
const authController = require('../controller/control');
const db = require("../database/connect");

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/search',(req,res)=>{
    search = req.query.search
    if(search == ''){
    db.query('Select * from property ',(err,result)=>{
        if (err) {
            console.log(err);
        }
        else{
            return res.render('viewproperties',{property:result})
        }
    })
}
else{
    db.query('Select * from property where location = ?', [search],(err,result)=>{
        if (err) {
            console.log(err);
        }
        else{
            return res.render('viewproperties',{property:result})

}
    })
}
})


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