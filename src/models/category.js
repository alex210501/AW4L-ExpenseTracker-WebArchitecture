const DataTypes = require("sequelize")

const sequelize = require("../services/database")


const Category = sequelize.define('category', {
    category_id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
    },
    category_title: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    category_space: {
        type: DataTypes.STRING(64),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
})

module.exports = Category