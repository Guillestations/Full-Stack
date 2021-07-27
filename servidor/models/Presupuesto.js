const Sequelize = require('sequelize');
const db = require('../config/db');

const Presupuesto = db.define('presupuesto', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    creador: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Presupuesto;