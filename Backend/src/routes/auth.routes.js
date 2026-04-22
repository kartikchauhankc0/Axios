const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controller')
const { authUser, authArtist } = require('../middlewares/auth.middleware')

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logOutUser)

// ✅ NEW ROUTE
router.get('/me', authUser, authController.getCurrentUser)

module.exports = router