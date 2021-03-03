const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

//Signup
users.get('/signup', (req, res) => {
    res.render('users/signup.ejs', {
        pageTitle: 'Sign Up',
        currentUser: req.session.currentUser,
        error: undefined
    });
});

//Create

users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        if(err){
            console.log(err.errors.username.properties)
            let newErr;
            if(err.errors.username.properties.type == 'required'){
                newErr = 'Please Input a Username';
            }else{
                newErr = 'OOPS';
            }
            res.render('users/signup.ejs', {
                pageTitle: 'Sign Up',
                currentUser: req.session.currentUser,
                error: newErr
            });
        }else{
            console.log(createdUser);
            res.redirect('/sessions/new');
        }
        
    });
});

module.exports = users;