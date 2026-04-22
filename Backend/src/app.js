const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const favoriteRoutes = require('./routes/favorite.routes')

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/music', musicRoutes)
app.use('/api/favorites', favoriteRoutes)

module.exports = app