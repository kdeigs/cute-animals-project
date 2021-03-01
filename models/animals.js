const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema(
    {
        name: String,
        fluff: Number,
        size: Number,
        img: String,
        type: String,
        credit: String
    }
)

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;