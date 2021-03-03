const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

//Signup
users.get('/signup', (req, res) => {
    res.render('users/signup.ejs', {
        pageTitle: 'Sign Up',
        currentUser: req.session.currentUser
    });
});

//Create

users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        err ? console.log(err) : console.log(createdUser);
        res.redirect('/animals');
    });
});

module.exports = users;