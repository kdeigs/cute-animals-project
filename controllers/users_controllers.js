const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

//Signup
users.get('/signup', (req, res) => {
    res.render('users/signup.ejs', {
        pageTitle: 'Sign Up'
    });
});

//Create

users.post('/', (req, res) => {
    
})

module.exports = users;