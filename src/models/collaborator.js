const DataTypes = require("sequelize")

const sequelize = require("../services/database")


const Collaborator = sequelize.define('collaborator', {
    collaborator_id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
    },
    collaborator_user: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    collaborator_space: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
})

module.exports = Collaborator