const generateUUID = require('../services/uuid')
const Collaborator = require('../models/collaborator')
const Message = require('../models/message')
const Space = require('../models/space')
const User = require('../models/user')
const { removeCollaboratorsSpaceFromResults } = require('../modules/space_tools')

const editableSpaceColumns = ['space_name', 'space_description']

class SpaceController {
    static _formatCollaborators(collaborators) {
        const formatedCollaborators = []

        for (const collaborator of collaborators) {
            formatedCollaborators.push(collaborator.dataValues.user_username)
        }

        return formatedCollaborators
    }

    static _formatSpaces(result) {
        let spaces = []

        for (const user of result) {
            for (const space of user.dataValues.collaborators_users) {
                const formattedSpace = {
                    space_id: space.space_id, 
                    space_name: space.space_name, 
                    space_description: space.space_description,
                    space_collaborators: SpaceController._formatCollaborators(space.collaborators_space),
                }

                spaces.push(formattedSpace)
            }
        }

        return spaces
    }

    static getSpaces(req, res) {
        const username = req.username

        User.findAll({
            where: { user_username: username },
            attributes: [],
            include: [{
                model: Space,
                as: 'collaborators_users',
                include: [{
                    model: User,
                    as: 'collaborators_space',
                    attributes: ['user_username'],
                }]
            }],
        }).then((result) => {
            res.json(SpaceController._formatSpaces(result))
        }).catch((err) => res.json(new Message(err)))
    }
    
    static createSpace(req, res) {
        const username = req.username
        const { space_name, space_description } = req.body

        Space.create({
            space_id: generateUUID(),
            space_name,
            space_description,
            space_admin: username,
        }).then((result) => res.json(result.dataValues))
        .catch((err) => res.json(new Message(err)))
    }

    static getSpace(req, res) {
        const space_id = req.params.space_id

        Space.findOne({
            where: {
                space_id
            },
            include: [{
                model: User,
                as: 'collaborators_space',
                attributes: ['user_username'],
            }]
        }).then((result) => {
            if (result == null) {
                res.status(404).json(new Message(`Space ${space_id} not found!`))
            } else {
                const formattedResult = removeCollaboratorsSpaceFromResults(result)
                res.json(formattedResult)
            }
        })
        // .catch((err) => res.json(new Message(err)))
    }

    static deleteSpace(req, res) {
        const space_id = req.params.space_id
        
        Space.destroy({
            where: {
                space_id
            }
        }).then((result) => {
            if (result == 0) {
                res.status(404)
            }
            res.json(result)
        })
        .catch((err) => res.json(new Message(err)))
    }

    static updateSpace(req, res) {
        const space_id = req.params.space_id
        const updatedField = req.body

        // Check if you can edit the attribute
        for (let field in updatedField) {
            if (!editableSpaceColumns.includes(field)) {
                res.status(400).json(new Message(`You can't edit ${field}!`))
                return
            }
        }

        // Update the instance
        Space.update(updatedField, { where: { space_id } })
            .then((result) => res.json(result))
            .catch((err) => res.json(new Message(err)))
    }
}

module.exports = SpaceController
