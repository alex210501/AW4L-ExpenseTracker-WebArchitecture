const Message = require('../models/message')
const User = require('../models/user')


class UserController {
    static getUsers(req, res) {
        User.findAll({
            attributes: [
                'user_username',
                'user_lastname',
                'user_firstname',
                'user_email',
            ]
        }).then((result) => res.json(result))
        .catch((err) => res.json(new Message(err)))
    }

    static createUser(req, res) {
        const { 
            user_username, 
            user_lastname, 
            user_firstname, 
            user_email, 
            user_password} = req.body

        User.create({
            user_username,
            user_lastname,
            user_firstname,
            user_email,
            user_password
        }).then((result) => {
            const { user_password: _, ...res_json } = result.dataValues
            res.json(res_json)
        }).catch((err) => res.json(new Message(err)))
    }

    static deleteUser(req, res) {
        const username = req.params.username

        User.destroy({
            where: {
                user_username: username
            }
        }).then((result) => res.json(new Message('Deleted successfully!')))
        .catch((err) => res.json(new Message(err)))
    }
}

module.exports = UserController
