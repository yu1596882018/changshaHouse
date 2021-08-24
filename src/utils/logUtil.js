const log4js = require('log4js')
const useragent = require('useragent')
const uuidv1 = require('uuid/v1')
const isProdu = process.env.NODE_ENV === 'production'

const getUserIp = (req) => {
  return (
    req.headers['x-forwarded-for'] ||
    (req.connection && req.connection.remoteAddress) ||
    (req.socket && req.socket.remoteAddress) ||
    (req.connection && req.connection.socket.remoteAddress) ||
    req.ip
  )
}

//格式化响应日志
var formatRes = function (ctx, resTime) {
  var logText = new String()
  var logObj = {}

  //响应日志开始
  logText += '\n' + '*************** response log start ***************' + '\n'

  //添加请求日志
  const reqLog = formatReqLog(ctx, resTime, logObj)
  logText += reqLog.logText

  //响应状态码
  logText += 'response status: ' + ctx.status + '\n'
  logObj.responseStatus = ctx.status

  //响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n'
  logObj.responseBody = JSON.stringify(ctx.body)

  //响应日志结束
  logText += '*************** response log end ***************' + '\n'

  return {
    logText,
    logObj,
  }
}

//格式化错误日志
var formatError = function (ctx, err, resTime) {
  var logText = new String()
  var logObj = {}

  //错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n'

  //添加请求日志
  const reqLog = formatReqLog(ctx, resTime, logObj)
  logText += reqLog.logText

  //错误名称
  logText += 'err name: ' + err.name + '\n'
  logObj.errName = err.name
  //错误信息
  logText += 'err message: ' + err.message + '\n'
  logObj.errMessage = err.message
  //错误详情
  logText += 'err stack: ' + err.stack + '\n'
  logObj.errStack = err.stack

  //错误信息结束
  logText += '*************** error log end ***************' + '\n'

  return {
    logText,
    logObj,
  }
}

//格式化请求日志
var formatReqLog = function (ctx, resTime, logObj = {}) {
  var req = ctx.request
  var logText = new String()

  var method = req.method
  //访问方法
  logText += 'request method: ' + method + '\n'
  logObj.requestMethod = method

  //请求host
  logText += 'request host:  ' + ctx.host + '\n'
  logObj.requestHost = ctx.host

  //请求原始地址
  logText += 'request originalUrl:  ' + req.originalUrl + '\n'
  logObj.requestOriginalUrl = req.originalUrl

  //请求命中路由
  logText += 'request matchedRoute:  ' + (ctx._matchedRoute || 'null') + '\n'
  logObj.requestMatchedRoute = ctx._matchedRoute || 'null'

  //客户端ip
  logText += 'request client ip:  ' + getUserIp(req) + '\n'
  logObj.ip = getUserIp(req)

  //请求参数
  logText += 'request params:  ' + JSON.stringify(ctx.params) + '\n'
  logObj.requestParams = JSON.stringify(ctx.params)
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(req.query) + '\n'
    logObj.requestQuery = JSON.stringify(req.query)
  } else {
    logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n'
    logObj.requestBody = JSON.stringify(req.body)
  }

  //请求token
  logText += 'request token: \n' + ctx.request.headers.token + '\n'
  logObj.requestToken = ctx.request.headers.token

  //请求签名
  logText += 'request sign: ' + ctx.request.headers.sign + '\n'
  logObj.requestSign = ctx.request.headers.sign

  //服务器响应时间
  logText += 'response time: ' + resTime + '\n'
  logObj.requestTime = resTime
  logObj.timestamp = new Date()

  var agent = useragent.parse(req.headers['user-agent'])
  logObj.browser = agent.family
  logObj.browserVersion = agent.toVersion()
  logObj.system = agent.os.family
  logObj.systemVersion = agent.os.toVersion()
  logText += 'userAgent: ' + agent.toString() + '\n'

  return {
    logText,
    logObj,
  }
}

function neatenWebReportBody(reqBody, reportBody, req) {
  reportBody.category = reqBody.category
  reportBody.logType = reqBody.logType
  Object.assign(reportBody, reqBody.deviceInfo || {})
  var agent = useragent.parse(reqBody.deviceInfo.userAgent)
  reportBody.browser = agent.family
  reportBody.browserVersion = agent.toVersion()
  reportBody.timestamp = new Date()
  reportBody.ip = getUserIp(req)
}

class LogUtil {
  constructor(logConfig, esClient) {
    log4js.configure(logConfig)
    this.errorLogger = log4js.getLogger('errorLogger')
    this.resLogger = log4js.getLogger('resLogger')
    this.mysqlLogger = log4js.getLogger('mysqlLogger')
    this.debugLogger = log4js.getLogger('DebugLogger')
    this.esClient = esClient
  }

  //封装错误日志
  logError(ctx, error, resTime) {
    if (ctx && error) {
      const errLog = formatError(ctx, error, resTime)

      this.esClient.create({
        index: 'server_err_logs',
        type: '_doc',
        id: uuidv1(),
        pipeline: 'geoip',
        body: errLog.logObj,
      })

      this.errorLogger.error(errLog.logText)
    }
  }

  // 封装响应日志
  logResponse(ctx, resTime) {
    if (ctx) {
      const resLog = formatRes(ctx, resTime)
      this.resLogger.info(resLog.logText)

      this.esClient.create({
        index: 'server_res_logs',
        type: '_doc',
        id: uuidv1(),
        pipeline: 'geoip',
        body: resLog.logObj,
      })
    }
  }

  // 封装响应日志
  logResponse(ctx, resTime) {
    if (ctx) {
      const resLog = formatRes(ctx, resTime)
      this.resLogger.info(resLog.logText)

      this.esClient.create({
        index: 'server_res_logs',
        type: '_doc',
        id: uuidv1(),
        pipeline: 'geoip',
        body: resLog.logObj,
      })
    }
  }

  logMysql(sql, ext_ts) {
    if (!isProdu) {
      console.log(sql)
    }
    this.mysqlLogger.info(sql + '\n', ext_ts, '\n')
  }

  debugLog(text, file_name) {
    if (!file_name) {
      file_name = ''
    }
    this.debugLogger.info(`${file_name}: >>>>> ${text}`)
  }

  webNetworkSpeed(ctx) {
    const reqBody = ctx.request.body
    const reportBody = {}
    neatenWebReportBody(reqBody, reportBody, ctx.request)
    reportBody.networkSpeed = reqBody.logInfo.networkSpeed
    reportBody.pageId = reqBody.logInfo.pageId

    this.esClient.create({
      index: 'web_network_speed_logs',
      type: '_doc',
      id: uuidv1(),
      pipeline: 'geoip',
      body: reportBody,
    })
  }

  webError(ctx) {
    const reqBody = ctx.request.body
    const reportBody = {}
    neatenWebReportBody(reqBody, reportBody, ctx.request)
    reportBody.errorInfo = reqBody.logInfo

    this.esClient.create({
      index: 'web_err_logs',
      type: '_doc',
      id: uuidv1(),
      pipeline: 'geoip',
      body: reportBody,
    })
  }

  webPerformance(ctx) {
    const reqBody = ctx.request.body
    const reportBody = {}
    neatenWebReportBody(reqBody, reportBody, ctx.request)
    Object.assign(reportBody, reqBody.logInfo)

    this.esClient.create({
      index: 'web_performance_logs',
      type: '_doc',
      id: uuidv1(),
      pipeline: 'geoip',
      body: reportBody,
    })
  }
}

module.exports = LogUtil
