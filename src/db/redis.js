/**
 * Redis数据库连接配置
 * 使用redis客户端连接Redis数据库
 */
const redis = require('redis')
const config = require('../config')

// 创建Redis客户端
const client = redis.createClient(config.redisConfig.port, config.redisConfig.host)

// 监听连接事件
client.on('connect', () => {
  console.log('✅ Redis数据库连接成功')
})

client.on('error', (error) => {
  console.error('❌ Redis数据库连接失败:', error.message)
})

client.on('ready', () => {
  console.log('🚀 Redis数据库准备就绪')
})

module.exports = client
