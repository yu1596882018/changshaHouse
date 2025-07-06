/**
 * 日志配置文件
 * 配置不同类型日志的输出方式和存储路径
 * @author 长沙房屋查询平台
 * @version 2.0.0
 */
const path = require('path')

/**
 * 日志根目录
 * @type {string}
 */
const baseLogPath = path.resolve(__dirname, '../../logs')

/**
 * 日志配置对象
 */
module.exports = {
  appenders: {
    /**
     * 错误日志
     */
    errorLogger: {
      type: 'dateFile',
      filename: `${baseLogPath}/error/error`,
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd-hh.log',
      daysToKeep: 30,
      keepFileExt: true,
      compress: true,
    },
    /**
     * 响应日志
     */
    resLogger: {
      type: 'dateFile',
      filename: `${baseLogPath}/response/response`,
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd-hh.log',
      daysToKeep: 30,
      keepFileExt: true,
      compress: true,
    },
    /**
     * MySQL日志
     */
    mysqlLogger: {
      type: 'dateFile',
      filename: `${baseLogPath}/mysql/mysql`,
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd-hh.log',
      daysToKeep: 30,
      keepFileExt: true,
      compress: true,
    },
    /**
     * 调试日志
     */
    DebugLogger: {
      type: 'dateFile',
      filename: `${baseLogPath}/debug/debug`,
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd-hh.log',
      daysToKeep: 7,
      keepFileExt: true,
      compress: false,
    },
  },
  categories: {
    /**
     * 错误日志类别
     */
    errorLogger: { appenders: ['errorLogger'], level: 'error' },
    /**
     * 响应日志类别
     */
    resLogger: { appenders: ['resLogger'], level: 'info' },
    /**
     * MySQL日志类别
     */
    mysqlLogger: { appenders: ['mysqlLogger'], level: 'info' },
    /**
     * 默认调试日志类别
     */
    default: { appenders: ['DebugLogger'], level: 'all' },
  },
}
