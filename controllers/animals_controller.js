const express = require('express');
const animals = express.Router();
const Animal = require('../models/animals.js');

//Index
animals.get('/', (req, res) => {
    Animal.find({}, (err, items) => {
        err ? console.log(err) : console.log(items);
        res.render('animals/index.ejs', {
            animals: items,
            pageTitle: 'Index'
        });
    });
});

//New
animals.get('/new', (req, res) => {
    res.render('animals/new.ejs', {
        pageTitle: 'New'
    });
});

//Create
animals.post('/', (req, res) => {
    Animal.create(req.body, (err, newItem) => {
        err ? console.log(err) : console.log(newItem);
    });
    res.redirect('/animals');
});

//Edit
animals.get('/:id/edit', (req, res) => {
    Animal.findById(req.params.id, (err, item) => {
        err ? console.log(err) : console.log(item);
        res.render('animals/edit.ejs', {
            animal: item,
            pageTitle: 'Edit'
        });
    });
})

//Update
animals.put('/:id', (req, res) => {
    Animal.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
        err ? console.log(err) : console.log(updated);
        res.redirect(`/${req.params.id}`);
    });
});

//Delete
animals.delete('/:id', (req, res) => {
    Animal.findByIdAndDelete(req.params.id, (err, deleted) => {
        err ? console.log(err) : console.log(deleted);
        res.redirect('/animals');
    });
});

//Show
animals.get('/:id', (req, res) => {
    Animal.findById(req.params.id, (err, item) => {
        err ? console.log(err) : console.log(item);
        res.render('animals/show.ejs', {
            animal: item
        });
    });
});

module.exports = animals;