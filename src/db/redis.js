const redis = require('redis')
const config = require('../config')

module.exports = redis.createClient(config.redisConfig.port, config.redisConfig.host)
