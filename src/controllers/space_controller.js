const generateUUID = require('../services/uuid')
const Message = require('../models/message')
const Space = require('../models/space')
const User = require('../models/user')
const Collaborator = require('../models/collaborator')

const editableSpaceColumns = ['space_name', 'space_description']

class SpaceController {
    static cleanCollaborators(collaborators) {
        var users = []
        
        for (let user of collaborators) {
            users.push(user.dataValues.user_username)
        }
        
        return users
    }

    static getSpaces(req, res) {
        Space.findAll().then((result) => res.json(result))
        .catch((err) => res.json(new Message(err)))
    }
    
    static createSpace(req, res) {
        const {space_name, space_description, space_admin} = req.body

        Space.create({
            space_id: generateUUID(),
            space_name,
            space_description,
            space_admin,
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
                required: true,
                as: 'collaborators_space',
                attributes: ['user_username'],
                required: true,
            }]
        }).then((result) =>{
            if (result == null) {
                res.status(404).json(new Message(`Space ${space_id} not found!`))
            } else {
                res.json(result)
            }
        })
        .catch((err) => res.json(new Message(err)))
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
