/**
 * 统一错误处理中间件
 * 捕获所有未处理的错误并提供统一的错误响应格式
 * @author 长沙房屋查询平台
 * @version 2.0.0
 */
const APIError = require('./apiError');
const config = require('../config');
const {logUtil} = require('../utils');

/**
 * 错误处理中间件
 * @param {Object} ctx Koa上下文
 * @param {Function} next 下一个中间件
 */
module.exports = async(ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 记录错误日志
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      url: ctx.url,
      method: ctx.method,
      ip: ctx.ip,
      userAgent: ctx.headers['user-agent'],
      timestamp: new Date().toISOString(),
      requestId: ctx.headers['x-request-id'] || 'unknown',
    };

    console.error('❌ 错误详情:', errorInfo);

    // 记录到日志文件
    logUtil.logError(ctx, error, 0);

    // 处理已知的API错误
    if (error instanceof APIError) {
      ctx.status = 200; // API错误统一返回200状态码
      ctx.body = {
        code: error.code,
        message: error.message,
        error_name: error.name,
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    // 处理Sequelize数据库错误
    if (error.name === 'SequelizeValidationError') {
      ctx.status = 200;
      ctx.body = {
        code: 400,
        message: '数据验证失败',
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message,
          value: err.value,
        })),
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      ctx.status = 200;
      ctx.body = {
        code: 409,
        message: '数据已存在，请检查唯一性约束',
        field: error.errors[0]?.path,
        value: error.errors[0]?.value,
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    if (error.name === 'SequelizeForeignKeyConstraintError') {
      ctx.status = 200;
      ctx.body = {
        code: 400,
        message: '外键约束错误，请检查关联数据',
        field: error.fields[0],
        table: error.table,
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    if (error.name === 'SequelizeConnectionError') {
      ctx.status = 200;
      ctx.body = {
        code: 503,
        message: '数据库连接失败，请稍后重试',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    if (error.name === 'SequelizeTimeoutError') {
      ctx.status = 200;
      ctx.body = {
        code: 408,
        message: '数据库操作超时，请稍后重试',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    // 处理JWT错误
    if (error.name === 'JsonWebTokenError') {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        message: '无效的认证令牌',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    if (error.name === 'TokenExpiredError') {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        message: '认证令牌已过期，请重新登录',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    // 处理网络请求错误
    if (error.code === 'ECONNREFUSED') {
      ctx.status = 200;
      ctx.body = {
        code: 503,
        message: '服务暂时不可用，请稍后重试',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    if (error.code === 'ENOTFOUND') {
      ctx.status = 200;
      ctx.body = {
        code: 503,
        message: '服务地址未找到，请检查网络连接',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    // 处理超时错误
    if (error.code === 'ETIMEDOUT') {
      ctx.status = 200;
      ctx.body = {
        code: 408,
        message: '请求超时，请稍后重试',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    // 处理文件系统错误
    if (error.code === 'ENOENT') {
      ctx.status = 200;
      ctx.body = {
        code: 404,
        message: '请求的资源不存在',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    if (error.code === 'EACCES') {
      ctx.status = 200;
      ctx.body = {
        code: 403,
        message: '权限不足，无法访问资源',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    // 处理内存错误
    if (error.code === 'ENOMEM') {
      ctx.status = 200;
      ctx.body = {
        code: 503,
        message: '服务器内存不足，请稍后重试',
        timestamp: new Date().toISOString(),
        path: ctx.path,
        requestId: errorInfo.requestId,
      };
      return;
    }

    // 处理其他未知错误
    ctx.status = 200;
    ctx.body = {
      code: 500,
      message: config.server.env === 'production' ? '服务器内部错误，请稍后重试' : error.message,
      ...(config.server.env === 'development' && {
        stack: error.stack,
        name: error.name,
        code: error.code,
      }),
      timestamp: new Date().toISOString(),
      path: ctx.path,
      requestId: errorInfo.requestId,
    };
  }
};
