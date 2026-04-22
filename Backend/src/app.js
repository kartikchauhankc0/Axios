const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const favoriteRoutes = require('./routes/favorite.routes')

app.use(express.json())
app.use(cookieParser())

// ✅ FIXED CORS (IMPORTANT)
app.use(cors({
  origin: [
    "http://localhost:5173", // local
    "https://axios-flax.vercel.app/login" // change later
  ],
  credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/music', musicRoutes)
app.use('/api/favorites', favoriteRoutes)

// optional root route
app.get("/", (req, res) => {
  res.send("API is running 🚀")
})

module.exports = app