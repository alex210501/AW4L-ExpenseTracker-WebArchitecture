const jwt = require('jsonwebtoken')

const Message = require('../models/message')


const expiresIn = '1h'
const secretKey = 'mysecret'

function generateToken(username) {
    info = {
        username,
        requestDate: Date.now(),
    }

    return jwt.sign({
        username,
        requestDate: Date.now(),
    }, secretKey, { expiresIn })
}

function isTokenValid(req, res, next) {
    // Check if a token has been passed
    if (req.headers.authorization == null) {
        res.status(401).json(new Message('Not Authorized!'))
        return
    }

    // Retrieve token from header
    const token = req.headers.authorization.split(' ')[1]
    
    // Check if the token is valid
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).json(new Message('Not Authorized!'))
        } else {
            req.username = decoded.username
            next()
        }
    })
}

module.exports = {
    generateToken,
    isTokenValid,
}