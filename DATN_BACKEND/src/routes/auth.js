const express = require('express')
const authenticate = require('../middleware/auth')
const authController = require('../controllers/authController')

const router = express.Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/profile', authenticate, authController.profile)

module.exports = router
