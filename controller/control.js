const mysql = require('mysql');
const express = require('express');
const bcrypt = require('bcryptjs')
const db = require('../database/connect');

//Properties on index
exports.properties = (req,res)=>{
    db.query('Select * from property ', (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            return res.render('viewproperties',{property:result})
        }
    })
}

//Register
exports.register = (req, res) => {
    const name = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const passwordConfirm = req.body.passwordConfirm;
    // const {name,email,password,passwordConfirm} = req.body;

    if (name && password && email && passwordConfirm) {

    db.query('SELECT email FROM user where email=? ', [email], async (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.length > 0) {
            return res.render('signup', {
                message: 'The email is already in use'
            })
        }
        else if (password !== passwordConfirm) {
            return res.render('signup', {
                message: 'The passwords do not match'
            })
        }
        // let hashedPassword = await bcrypt.hash(password, 8)

        db.query('insert into user set ?', { name: name, email: email, password: password }, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.render('signup', {
                    message: 'user registerd'
                })
            }

        })
    })
}
else{
    res.render('signup',{
        message: 'Please fill the details'
    })
}
}

//login
exports.login = (req, res) => {
    const session = req.session
    const name = req.body.username;
    const password = req.body.password;
    if (name && password) {
        db.query('SELECT id,name,password FROM user where name=? and password = ?', [name,password], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.length>0){
                
                req.session.loggedin = true;
                req.session.name = name;
                req.session.userId = result[0].id;
                res.redirect('/auth/dashboard');
            }
            else{
                res.render('login',{
                    message: 'The username and password do not match'}
                )
                
            }
        }
        )
    }
    else{
        res.render('login',{
            message: 'Please enter username and password'
        })
        
    }
}

//Properties on dashboard
exports.dashboard=(req,res)=>{
	const userId = req.session.userId;
    db.query('Select * from property where uid=?', [userId], (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            return res.render('dashboard',{message:req.session.name,property:result})
        }
    })

}

//edit
exports.edit=(req,res)=>{
    const location = req.body.location
    const price = req.body.price
    const desc = req.body.desc
    const user = req.session.name
    const userId = req.session.userId
    db.query('Update property set ? where pid', { uid:userId,renter: user, location:location,price:price,description:desc }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.redirect('/auth/dashboard/rent',)
        }

    })
    
}

exports.delete=(req,res)=>{
    db.query('Delete from property where pid=?', [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.redirect('/auth/dashboard',)
        }

    })

}

//Rent properties
exports.rent=(req,res)=>{
    const location = req.body.location.toUpperCase()
    const price = req.body.price
    const desc = req.body.desc
    const user = req.session.name
    const userId = req.session.userId

    db.query('insert into property set ?', { uid:userId,renter: user, location:location,price:price,description:desc }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.redirect('/auth/dashboard',)
        }

    })

}

