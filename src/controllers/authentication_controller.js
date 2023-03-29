const crypto = require('crypto')

const { generateToken } = require('../modules/authentication_tools')
const Message = require('../models/message')
const Collaborator = require("../models/collaborator")
const User = require("../models/user")

class AuthenticationController {
    static login(req, res) {
        const { username, password } = req.body
        
        // Check on database
        User.findOne({
            where: {
                user_username: username
            },
            attributes: ['user_password'],
        }).then((result) => {
            const hashed_password = crypto.createHash('sha256').update(password).digest('hex')

            if (hashed_password == result.user_password) {
                res.json({token: generateToken(username)})
            } else {
                res.status(401).json(new Message('Authentication failed!'))
            }
        }).catch((error) => {
            res.status(404).json(new Message(`User ${username} does not exists!`))
        })
    }

    static logout(req, res) {
        console.log(req.username)
    
        res.json(new Message('Logout'))
    }
}

module.exports = AuthenticationController