const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const Task = require('./Task');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Task = Task;

module.exports = db;