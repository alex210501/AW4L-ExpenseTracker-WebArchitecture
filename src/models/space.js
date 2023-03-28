const DataTypes = require("sequelize")

const Collaborator = require('../models/collaborator')
const User = require('../models/user')
const sequelize = require("../services/database")


const Space = sequelize.define('space', {
    space_id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
    },
    space_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    space_description: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    space_admin: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
})

// Space.belongsTo(User, { foreignKey: 'space_admin' })

Space.belongsToMany(User, {
    through: Collaborator,
    as: 'collaborators_space',
    foreignKey: 'collaborator_space'
})

User.belongsToMany(Space, {
    through: Collaborator, 
    as: 'collaborators_users',
    foreignKey: 'collaborator_user'
})

module.exports = Space