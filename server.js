// Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');


// Configuration
require('dotenv').config();
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const DBNAME = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ `cute_animals`;

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DATABASE
mongoose.connect(
    DBNAME,
    {
        useNewUrlParse: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => {
        console.log('The connection with mongod is established at ', DBNAME);
    }
);

db.on('error', err => console.log(err.message + ' is mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Controllers
const animalRouter = require('./controllers/animals_controller');

app.use('/animals', animalRouter);

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});