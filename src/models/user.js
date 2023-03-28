const DataTypes = require("sequelize")

const sequelize = require("../services/database")


const User = sequelize.define('user', {
    user_username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
    },
    user_firstname: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    user_lastname: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    user_password: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
})

module.exports = User