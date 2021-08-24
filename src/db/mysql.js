const Sequelize = require('sequelize')
const config = require('../config')
const { logUtil } = require('../utils')

config.mysqlConfig.logging = logUtil.logMysql.bind(logUtil)
module.exports = new Sequelize(...config.mysqlConfig)
