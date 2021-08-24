const LogUtil = require('@yu1596882018/server-sdk/utils/logUtil')
const logConfig = require('../config/logConfig')
const esClient = require('../db/es')

module.exports = {
  logUtil: new LogUtil(logConfig, esClient),
  getIPAdress() {
    // 获取本机主机名和ip
    var interfaces = require('os').networkInterfaces()
    for (var devName in interfaces) {
      var iface = interfaces[devName]
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address
        }
      }
    }
  },
}
