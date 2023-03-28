const Sequelize = require("sequelize")

const connection = require("../configs/database.json")


const sequelize = new Sequelize({
        host: connection.host,
        port: connection.port,
        database: connection.database,
        username: connection.username,
        password: connection.password,
        dialect: 'mysql',
    }
)

module.exports = sequelize