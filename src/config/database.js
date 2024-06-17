const { Sequelize } = require('sequelize');
const config = require('./config');

const host = config.dbHost
const port = config.dbPort
const user = config.dbUser
const pass = config.dbPass

//const sequelize = new Sequelize('mysql://'+ user +':'+ pass +'@'+ host +':'+ port +'/myapp');
const sequelize = new Sequelize(`mysql://${user}:${pass}@${host}:${port}/myapp`);

module.exports = sequelize;