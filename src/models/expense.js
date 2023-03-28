const DataTypes = require("sequelize")

const sequelize = require("../services/database")


const Expense = sequelize.define('expense', {
    expense_id: {
        type: DataTypes.STRING(64),
        allowNull: false,
        primaryKey: true,
    },
    expense_cost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    expense_description: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    expense_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expense_space: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    expense_paid_by: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    expense_category: {
        type: DataTypes.STRING(64),
        allowNull: true,
    }
}, {
    freezeTableName: true,
    timestamps: false,
})

module.exports = Expense
