require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected on database'))

// User router
const userRouter = require('./routes/user')
app.use('/api/user', userRouter)

// Login router
const loginRouter = require('./routes/login')
app.use('/api/login', loginRouter)

// Token router
const tokenRouter = require('./routes/token')
app.use('/api/token', tokenRouter)

// Pizza router
const pizzaRouter = require('./routes/pizza')
app.use('/api/pizza', pizzaRouter)


app.listen(PORT, () => console.log('Server running on port', PORT))