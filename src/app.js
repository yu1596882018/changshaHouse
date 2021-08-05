const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const logger = require('koa-logger')
const json = require('koa-json')
const bodyparse = require('koa-bodyparser')
const cors = require('koa2-cors')
const routers = require('./routers')
const { logUtil } = require('./utils')
const config = require('./config')
const { esClient } = require('./config/db')
const responseFormatter = require('./middlewares/responseFormatter')

const App = new Koa()

// 错误捕获并生成日志、生成请求日志
App.use(async (ctx, next) => {
  let startTime = Date.now()
  try {
    await next()

    logUtil.logResponse(ctx, Date.now() - startTime, esClient)
  } catch (error) {
    logUtil.logError(ctx, error, Date.now() - startTime, esClient)
  }
})

if (config.jsonSchema) {
  App.use(json())
}

// 错误返回处理
App.use(responseFormatter)

//绑定中间件
App.use(logger())
  .use(cors())
  .use(serve(path.join(__dirname, './static')), {
    maxage: 10 * 60 * 1000,
  })
  .use(bodyparse())

// 路由注册
Object.keys(routers).forEach((item) => {
  let router = routers[item]
  App.use(router.routes()).use(router.allowedMethods())
})

module.exports = App
