const express = require('express')
const router = express.Router()
const Pizza = require('../models/pizza')
const authenticateToken = require('../helpers/authenticate')

// Get all pizza
router.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find()
        res.json(pizzas)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one pizza
router.get('/:id', getPizza, (req, res) => {
    res.json(res.pizza)
})

// Create one pizza
router.post('/', authenticateToken, async (req, res) => {
    const pizza = new Pizza({
        name: req.body.name,
        ingredients: req.body.ingredients,
        diet: req.body.diet,
        imgPath: req.body.imgPath,
        price: req.body.price
    })
    try {
        const newPizza = await pizza.save()
        res.status(201).json(newPizza)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one pizza
router.patch('/:id', getPizza, authenticateToken, async (req, res) => {
    if (req.body.name != null) {
        res.pizza.name = req.body.name
    }
    if (req.body.ingredients != null) {
        res.pizza.ingredients = req.body.ingredients
    }
    if (req.body.diet != null) {
        res.pizza.diet = req.body.diet
    }
    if (req.body.imgPath != null) {
        res.pizza.imgPath = req.body.imgPath
    }
    if (req.body.price != null) {
        res.pizza.price = req.body.price
    }
    try {
        const updatedPizza = await res.pizza.save()
        res.json(updatedPizza)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one pizza
router.delete('/:id', getPizza, authenticateToken, async (req, res) => {
    try {
        await res.pizza.remove()
        res.json({ message: `Pizza ${req.params.id} has been deleted`})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Middleware to retrieve pizza by id param
async function getPizza(req, res, next) {
    let pizza
    try {
        pizza = await Pizza.findById(req.params.id)
        if (pizza == null) {
            return res.status(404).json({ message: "Cannot find pizza." })
        }
    } catch (err) {
        return res.status(500).message({ message: err.message })
    }

    res.pizza = pizza
    next()
}

module.exports = router