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
            if (password == result.user_password) {
                res.json(new Message('Authentificated!'))
            } else {
                res.status(401).json(new Message('Authentication failed!'))
            }
        }).catch((error) => {
            res.status(404).json(new Message(`User ${username} does not exists!`))
        })
        
        // res.json(new Message('Login'))
    }

    static logout(req, res) {
        console.log(req.body)
    
        res.json(new Message('Logout'))
    }
}

module.exports = AuthenticationController