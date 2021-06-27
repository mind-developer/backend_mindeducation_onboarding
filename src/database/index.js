const Sequilize = require('sequelize')
const dbConfig = require('../config/database')
const User = require('../models/User')


const connection = new Sequilize(dbConfig)
User.init(connection)

module.exports = connection