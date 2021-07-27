const Sequelize = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_DATABASE,process.env.DB_USERNAME,process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        adle: 10000
    }
})

module.exports = db;