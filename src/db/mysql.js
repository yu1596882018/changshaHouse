/**
 * MySQL数据库连接配置
 * 使用Sequelize ORM连接MySQL数据库
 */
const Sequelize = require('sequelize')
const config = require('../config')
const { logUtil } = require('../utils')

// 配置MySQL日志记录
config.mysqlConfig.logging = logUtil.logMysql.bind(logUtil)

// 创建Sequelize实例
const sequelize = new Sequelize(...config.mysqlConfig)

// 测试数据库连接
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ MySQL数据库连接成功')
  })
  .catch((error) => {
    console.error('❌ MySQL数据库连接失败:', error.message)
  })

module.exports = sequelize
