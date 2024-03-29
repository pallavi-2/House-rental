const express = require('express');
const authController = require('../controller/control')
const router = express.Router();


router.post('/register',authController.register)

router.post('/login',authController.login)

router.get('/dashboard',authController.dashboard)

router.get('/dashboard/edit/:id',authController.edit)

router.post('/dashboard/update/:id',authController.update)

router.get('/dashboard/delete/:id',authController.delete)

router.get('/dashboard/rent',(req,res)=>{
    res.render('rent',{message:req.session.name})
})




router.post('/dashboard/rent', authController.rent)



module.exports = router;