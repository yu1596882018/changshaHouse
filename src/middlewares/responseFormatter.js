/**
 * 统一响应格式中间件
 * 捕获APIError并标准化响应格式，处理未知错误
 * @author 长沙房屋查询平台
 * @version 2.0.0
 */
const APIError = require('./apiError');

/**
 * 响应格式化中间件
 * @param {Object} ctx Koa上下文
 * @param {Function} next 下一个中间件
 */
module.exports = async(ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof APIError) {
      ctx.status = 200;
      ctx.body = {
        code: error.code,
        error_name: error.name,
        message: error.message,
        timestamp: new Date().toISOString(),
        path: ctx.path,
      };
    } else {
      // 未知错误，记录日志
      console.error('未捕获异常:', error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: '服务器错误',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString(),
        path: ctx.path,
      };
    }
    // 继续抛出错误，供外层中间件处理日志
    throw error;
  }
};
