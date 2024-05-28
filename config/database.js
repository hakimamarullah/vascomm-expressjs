const {Sequelize} = require("sequelize")

const sequelize = new Sequelize(
    process.env.PG_DB || 'vascomm',
    process.env.PG_USER || 'vascomm',
    process.env.PG_PASSWORD || 'vascomm', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5433
    });

module.exports = sequelize