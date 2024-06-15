const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Utenti = sequelize.define('Utenti', {
nome: {
type: DataTypes.STRING,
allowNull: false
},
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true
}
});
module.exports = Utenti