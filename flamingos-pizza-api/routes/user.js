const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        const usersFiltered = users.map(user => (
            {
                id: user.id,
                email: user.email,
                role: user.role}
        ))
        res.json(usersFiltered)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one user
router.get('/:id', getUser, (req, res) => {
    res.json({
        id: res.user.id,
        email: res.user.email,
        role: res.user.role
    })
})

// Create one user
router.post('/', async (req, res) => {
    // TODO : put restrictions on user password
    try {
        // Check if email is already taken
        const checkEmail = await User.findOne({ email: req.body.email })
        if (checkEmail != null) {
            return res.status(400).json({ message: "Email is already in use."})
        }

        // Hashing password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Saving new user
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            role: "User"
        })

        await user.save()
        res.status(201).json({ message: "User has been successfully created."})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }    
})

// Update one user
router.patch('/:id', getUser, async (req, res) => {
    // TODO : put restrictions on user password
    try {
        if (req.body.password != null) {
            const salt = await bcrypt.genSalt()
            res.user.password = await bcrypt.hash(req.body.password, salt)
        } 

        await res.user.save()
        res.json({ message: "Password has been successfully updated."})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: `User ${req.params.id} has been deleted.`})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Retrieve one user by id param
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user."})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

module.exports = router