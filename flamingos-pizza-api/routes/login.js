const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    try {
        // Check if user exist
        const user = await User.findOne({ email: req.body.email })
        if (user == null) {
            // Returned status should be 404 but it informs that the email does not exist, hence 401 is implemented for security reason
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (checkPassword) {
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            const tokens = {accessToken, refreshToken}
            res.cookie('tokens', tokens, { 
                httpOnly: true,
                sameSite: 'none',
                secure: true 
            })
            res.json({ accessToken, refreshToken })
        } else {
            res.status(401).json({ message: 'Invalid credentials'})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

function generateAccessToken(user) {
    const isAdmin = user.role === 'Admin'
    return jwt.sign({ isAdmin: isAdmin, id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'})
}

function generateRefreshToken(user) {
    const isAdmin = user.role === 'Admin'
    return jwt.sign({ isAdmin: isAdmin, id: user._id}, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = router