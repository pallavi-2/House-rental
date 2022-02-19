const mysql = require('mysql');
const bcrypt = require('bcryptjs')
const db = require('../database/connect');
const path = require('path');
const Connection = require('mysql/lib/Connection');

//search
exports.search = (req, res) => {
    search = req.query.search
    if (search == '') {
        db.query('Select * from property ', (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.render('viewproperties', { property: result })
            }
        })
    }
    else {
        db.query('Select * from property where location = ?', [search], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.render('viewproperties', { property: result })

            }
        })
    }
}

//Properties on index
exports.properties = (req, res) => {
    db.query('Select * from property ', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.render('viewproperties', { property: result })
        }
    })
}

//Register
exports.register = async (req, res) => {
    const name = req.body.username.toUpperCase();
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
                    message: 'The email is already in use',type:"error"
                })
            }
            else if (password !== passwordConfirm) {
                return res.render('signup', {
                    message: 'The passwords do not match',type:"error"
                })
            }
            let hashedPassword = await bcrypt.hash(password, 8)

            db.query('insert into user set ?', { name: name, email: email, password: hashedPassword }, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    return res.render('signup', {
                        message: 'user registerd',type:"success"
                    })
                }

            })
        })
    }
    else {
        res.render('signup', {
            message: 'Please fill the details',type:"error"
        })
    }
}

//login
exports.login = async (req, res) => {
    const session = req.session
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        db.query('SELECT id,name,email,password FROM user where email=? ', [email], async (err, result) => {
            if (err) {
                console.log(err)
            }
            const compared = await bcrypt.compare(password, result[0].password)
            if (!compared) {
                res.render('login', {
                    message: 'The email and password do not match'
                })
            }
            if (result.length > 0) {

                req.session.loggedin = true;
                req.session.name = result[0].name;
                req.session.userId = result[0].id;
                res.redirect('/auth/dashboard');
            }
        }
        )
    }
    else {
        res.render('login', {
            message: 'Please enter email and password'
        })

    }
}

//Properties on dashboard
exports.dashboard = (req, res) => {
    const userId = req.session.userId;
    db.query('Select * from property where uid=?', [userId], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.render('dashboard', { message: req.session.name, property: result })
        }
    })

}
//display edit page
exports.edit = (req, res) => {
    db.query('Select * from property where pid =?', [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('edit', { message: req.session.name, value: result })
        }
    })

}

//edit
exports.update = (req, res) => {
    const location = req.body.location
    const price = req.body.price
    const desc = req.body.desc
    const user = req.session.name
    const userId = req.session.userId
    db.query('Update property set uid=?, renter=?,location=?,price=?,description=? where pid=?', [userId, user, location, price, desc, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.redirect('/auth/dashboard',)
        }

    })

}

exports.delete = (req, res) => {
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
exports.rent = (req, res) => {
    const location = req.body.location.toUpperCase();
    const price = req.body.price;
    const desc = req.body.desc;
    const user = req.session.name;
    const userId = req.session.userId;
    const sampleFile = req.files.samplefile;
    const uploadPath = path.join(__dirname,'..','public','images' , sampleFile.name)
    sampleFile.mv(uploadPath, (err, result) => {
        if (err) {
            console.log(err)
        }
    })

    db.query('insert into property set ?', { uid: userId, renter: user, location: location, price: price, description: desc ,image:sampleFile.name}, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.redirect('/auth/dashboard',)
        }

    })
}

