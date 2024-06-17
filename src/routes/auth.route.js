const express = require('express')
const { register, login, verifyToken} = require('../controllers/auth.controller')
const router = express.Router()
const config = require('../config/config')

const key = config.secretKey

router.post('/register', register)
router.post('/login', login)
router.get('/protected',verifyToken,(req,res) => {res.send('This is a protected route')})
router.post(
    '/renew',
    verifyToken, 
    (req,res) => {
        const { username } = req.user
        const newToken = jwt.sign({username}, key, {expiresIn:'1h'})
        res.json({ token: newToken})    
    }
)

module.exports = router