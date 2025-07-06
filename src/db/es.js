/**
 * Elasticsearch数据库连接配置
 * 使用elasticsearch客户端连接ES数据库
 */
const elasticsearch = require('elasticsearch')
const {esConfig, connectES} = require('../config')

// 创建ES客户端或模拟客户端
const client = connectES ? new elasticsearch.Client(esConfig) : {
  create() {
    console.log('⚠️ Elasticsearch未启用，使用模拟客户端')
  },
  search() {
    console.log('⚠️ Elasticsearch未启用，使用模拟客户端')
    return Promise.resolve({ hits: { hits: [] } })
  },
  index() {
    console.log('⚠️ Elasticsearch未启用，使用模拟客户端')
    return Promise.resolve({ _id: 'mock_id' })
  },
  delete() {
    console.log('⚠️ Elasticsearch未启用，使用模拟客户端')
    return Promise.resolve({ found: false })
  },
}

// 如果启用了ES，测试连接
if (connectES) {
  client.ping({}, (error) => {
    if (error) {
      console.error('❌ Elasticsearch连接失败:', error.message)
    } else {
      console.log('✅ Elasticsearch连接成功')
    }
  })
} else {
  console.log('ℹ️ Elasticsearch未配置，跳过连接测试')
}

module.exports = client
