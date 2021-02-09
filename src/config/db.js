// db.js
const redis = require('redis')
const Sequelize = require('sequelize')
const elasticsearch = require('elasticsearch')

const config = require('./index')
const { logUtil } = require('../utils')

const isProd = process.env.NODE_DEV === 'production'

const mysqlOptions = {
  host: 'localhost', // 数据库地址
  dialect: 'mysql', // 数据库类型
  port: 3306, // 端口号
  define: {
    underscored: true, // 字段以下划线分割
    // timestamps: false // 取消自动添加时间戳
  },
  logging: logUtil.logMysql, // 生成mysql日志文件
}

const devMysqlConfig = [
  'koa_demo', // 数据库名
  'root', // 用户名
  '12345', // 密码
  mysqlOptions,
]

const prodMysqlConfig = []
const mysqlConfig = isProd ? prodMysqlConfig : devMysqlConfig

const mysqlDb = new Sequelize(...mysqlConfig)

let redisDb = null
if (config.connectRedis) {
  redisDb = redis.createClient(6379, 'localhost')
}

let esClient = null
if (config.connectES) {
  esClient = new elasticsearch.Client({
    host: 'http://172.18.138.7:9200',
    apiVersion: '6.8',
  })
}

module.exports = {
  mysqlDb,
  redisDb,
  esClient,
}
