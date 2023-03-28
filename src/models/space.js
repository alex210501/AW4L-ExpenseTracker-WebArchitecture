const DataTypes = require("sequelize")

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

module.exports = Space