const mysql = require('mysql');
const bcrypt = require('bcryptjs')
const db = require('../database/connect');
exports.register=(req,res)=>{
    // console.log(req.body);
    const name = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const passwordConfirm = req.body.passwordConfirm;

    // const {name,email,password,passwordConfirm} = req.body;

    db.query('SELECT email FROM user where email=? ',[email], async (err,result)=>{
        if(err){
            console.log(err)
        }
        if(result.length>0){
            return res.render('signup',{
                message:'The email is used already'
            })
        }
        else if(password!==passwordConfirm){
            return res.render('signup',{
                message:'The passwords do not match'
        })
    }
        let hashedPassword = await bcrypt.hash(password, 8)

        db.query('insert into user set ?',{name:name, email:email,password:password},(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                return res.render('signup',{
                    message:'user registerd'
                })
            }

        })
    })
}