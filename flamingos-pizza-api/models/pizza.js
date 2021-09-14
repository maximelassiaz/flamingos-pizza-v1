const mongoose = require('mongoose')

const pizzasSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    ingredients: {
        type: Array,
        required: true,
        validate: {
            validator: ingredients => ingredients.every(ing => typeof ing === 'string'),
            message: "All ingredients must be of type string."
        }
    },
    diet : {
        isVegetarian: {
            type: Boolean,
            required: true
        },
        isVegan: {
            type: Boolean,
            required: true
        },
        isDairyFree: {
            type: Boolean,
            required: true
        }
    },
    imgPath: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Pizza', pizzasSchema)