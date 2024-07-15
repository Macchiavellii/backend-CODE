const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const User = require('../models/userModel')

const key = config.secretKey
//const users = []

exports.register = async (req,res) => {
    try {
        const {username, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, key)
        const user = await User.create({ name:username, email:email, password:hashedPassword });
        console.log(user.toJSON())
        res.status(201).send('User registered')        
    } catch (error) {
        res.status(500).send('Error: '+ error)
    }
}

/*exports.login = async (req,res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username)
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username },key,{expiresIn:'1h'})
        res.json({token})
    }
    else {
        res.status(401).send('Invalid Credentials')
    }
}*/

exports.login = async (req, res) => {
    const {username, password, email} = req.body;
    const user = await User.findAll();
    console.log(email+'->'+user[0].password);
    if (user && await bcrypt.compare(password, user[0].password)){
        const token = jwt.sign({username}, key, {expiresIn: '6h'});
        res.json({token});
    }else{
        res.status(401).send('Invalid credentials');
    }
}

exports.verifyToken = async (req,res,next) => {
    const token = req.headers['authorization']
    if (!token) { return res(403).status('A token is required!')}
    try {
        const decoded = jwt.verify(token, key)
        req.users = decoded
    } 
    catch (err) { return res.status(401).send('Invalid token')}
    return next
}