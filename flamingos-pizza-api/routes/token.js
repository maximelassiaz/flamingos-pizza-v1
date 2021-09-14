const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/', (req, res) => {
    const token = req.body.token 
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        // Check if user still exist
        const checkUser = checkIfUserStillExist(user.id) 
        if (checkUser != null) {
            const newAccessToken = jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin,
                role: user.role
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'})
            res.json({ accessToken: newAccessToken })
        }
    })
})

async function checkIfUserStillExist(id) {
    try {
        const user = await User.findById(id) 
        if (user == null) {
            return res.sendStatus(403)
        }
        return user
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = router