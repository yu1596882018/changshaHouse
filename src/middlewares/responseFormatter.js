/**
 * 处理错误返回
 */
const APIError = require('./apiError')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof APIError) {
      ctx.status = 200
      ctx.body = {
        code: error.code,
        error_name: error.name,
        message: error.message,
      }
    } else {
      console.log(`err:${error.code}`)
      console.log(`err m:${error.message}`)
      console.log(`err s:${error.stack}`)
      ctx.status = 500
      ctx.body = {
        code: -1,
        message: '服务器错误',
      }
    }
    //继续抛，让外层中间件处理日志
    throw error
  }
}
