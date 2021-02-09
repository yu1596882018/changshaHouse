var path = require('path')

//日志根目录
var baseLogPath = path.resolve(__dirname, '../../logs')

module.exports = {
  appenders: {
    // 错误日志
    errorLogger: {
      type: 'dateFile',
      filename: `${baseLogPath}/error/error`, //日志输出位置
      alwaysIncludePattern: true, //是否总是有后缀名
      pattern: '-yyyy-MM-dd-hh.log', //后缀，每小时创建一个新的日志文件
    },
    // 响应日志
    resLogger: {
      type: 'dateFile',
      filename: `${baseLogPath}/response/response`, //日志输出位置
      alwaysIncludePattern: true, //是否总是有后缀名
      pattern: '-yyyy-MM-dd-hh.log', //后缀，每小时创建一个新的日志文件
    },
    // mysql日志
    mysqlLogger: {
      type: 'dateFile',
      filename: `${baseLogPath}/mysql/mysql`, //日志输出位置
      alwaysIncludePattern: true, //是否总是有后缀名
      pattern: '-yyyy-MM-dd-hh.log', //后缀，每小时创建一个新的日志文件
    },
    // debug日志
    DebugLogger: {
      type: 'dateFile',
      filename: `${baseLogPath}/debug/debug`, //日志输出位置
      alwaysIncludePattern: true, //是否总是有后缀名
      pattern: '-yyyy-MM-dd-hh.log', //后缀，每小时创建一个新的日志文件
    },
  },
  categories: {
    // 错误日志
    errorLogger: { appenders: ['errorLogger'], level: 'error' },
    // 响应日志
    resLogger: { appenders: ['resLogger'], level: 'info' },
    // mysql日志
    mysqlLogger: { appenders: ['mysqlLogger'], level: 'info' },
    // debug日志
    default: { appenders: ['DebugLogger'], level: 'all' },
  },
}
