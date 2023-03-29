const generateUUID = require('../services/uuid')
const { removeCollaboratorsSpaceFromResults } = require('../modules/space_tools')
const Collaborator = require('../models/collaborator')
const Message = require('../models/message')
const Space = require('../models/space')
const User = require('../models/user')


class UserSpaceController {
    static _insertUserSpace(req, res, spaceId, username) {
        Collaborator.findOrCreate({
            defaults: {
                collaborator_id: generateUUID(),
                collaborator_space: spaceId,
                collaborator_user: username,
            },
            where: {
                collaborator_space: spaceId, 
                collaborator_user: username
            },
        }, ).then((result) => {
            const [output, wasInserted] = result

            if (!wasInserted) {
                res.status(400).json(new Message(`${username} is already in the space!`))
            } else {
                res.json(output)
            }
        }).catch(err => res.status(500).json(new Message(err)))
    }

    static _deleteUserSpace(req, res, spaceId, username) {
        Collaborator.destroy({
            where: { 
                collaborator_space: spaceId,
                collaborator_user: username
            }
        }).then((result) => {
            if (result == 0) {
                res.status(404).json(new Message(`${username} is not registered to the space!`))
            } else {
                res.json(result)
            }
        }).catch(err => res.status(500).json(new Message(err)))
    }

    static getUsers(req, res) {
        User.findAll({ 
            attributes: [
                'user_username',
                'user_firstname',
                'user_lastname',
                'user_email'
            ],
            include: [{
                model: Space,
                as: 'collaborators_users',
                attributes: [],
            }]
        }).then((result) => {
            res.json(result)
        })
    }

    static addUser(req, res) {
        const spaceId = req.params.space_id
        const { username } = req.body

        UserSpaceController._insertUserSpace(req, res, spaceId, username)
    }

    static deleteUser(req, res) {
        const spaceId = req.params.space_id
        const username = req.params.username

        UserSpaceController._deleteUserSpace(req, res, spaceId, username)
    }

    static joinSpace(req, res) {
        const spaceId = req.params.space_id

        UserSpaceController._insertUserSpace(req, res, spaceId, 'alex210501')
    }

    static quitSpace(req, res) {
        const spaceId = req.params.space_id

        UserSpaceController._deleteUserSpace(req, res, spaceId, 'alex210501')
    }
}

module.exports = UserSpaceController