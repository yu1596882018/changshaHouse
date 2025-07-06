/**
 * Koa应用主文件
 * 配置中间件、路由和安全设置
 * @author 长沙房屋查询平台
 * @version 2.0.0
 */
const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const logger = require('koa-logger');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const helmet = require('helmet');
const compress = require('koa-compress');
const rateLimit = require('koa-ratelimit');
const routers = require('./routers');
const {logUtil} = require('./utils');
const config = require('./config');
const responseFormatter = require('./middlewares/responseFormatter');
const errorHandler = require('./middlewares/errorHandler');

/**
 * 创建Koa应用实例
 */
const App = new Koa();

/**
 * 安全中间件配置
 * 设置安全相关的HTTP头
 */
App.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['\'self\''],
        styleSrc: ['\'self\'', '\'unsafe-inline\''],
        scriptSrc: ['\'self\''],
        imgSrc: ['\'self\'', 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }),
);

/**
 * 压缩中间件配置
 * 对响应内容进行gzip压缩
 */
if (config.features.compression) {
  App.use(
    compress({
      filter(content_type) {
        return /text|javascript|json|css|xml/i.test(content_type);
      },
      threshold: 2048,
      gzip: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
      },
      deflate: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
      },
      br: false,
    }),
  );
}

/**
 * 请求限流中间件配置
 * 防止API滥用和DDoS攻击
 */
if (config.features.rateLimit) {
  const db = new Map();
  App.use(
    rateLimit({
      driver: 'memory',
      db,
      duration: config.security.rateLimit.windowMs,
      max: config.security.rateLimit.max,
      errorMessage: '请求过于频繁，请稍后再试',
      id: ctx => ctx.ip,
      headers: {
        remaining: 'X-RateLimit-Remaining',
        reset: 'X-RateLimit-Reset',
        total: 'X-RateLimit-Total',
      },
    }),
  );
}

/**
 * 全局错误处理中间件
 * 捕获所有未处理的错误
 */
App.use(errorHandler);

/**
 * 请求日志中间件
 * 记录请求响应时间和错误信息
 * @param {Object} ctx Koa上下文
 * @param {Function} next 下一个中间件
 */
App.use(async(ctx, next) => {
  const startTime = Date.now();
  try {
    await next();
    const responseTime = Date.now() - startTime;
    logUtil.logResponse(ctx, responseTime);
  } catch (error) {
    const responseTime = Date.now() - startTime;
    logUtil.logError(ctx, error, responseTime);
    throw error;
  }
});

/**
 * JSON格式化中间件（仅开发环境）
 * 美化JSON响应输出
 */
if (config.features.jsonSchema) {
  App.use(
    json({
      pretty: config.server.env === 'development',
      param: 'pretty',
    }),
  );
}

/**
 * 统一响应格式中间件
 * 标准化API响应格式
 */
App.use(responseFormatter);

/**
 * 开发环境日志中间件
 * 显示详细的请求日志
 */
if (config.server.env === 'development') {
  App.use(
    logger({
      transporter: (str, args) => {
        console.log(str);
      },
    }),
  );
}

/**
 * CORS跨域中间件配置
 * 处理跨域请求
 */
App.use(
  cors({
    origin: config.security.cors.origin,
    credentials: config.security.cors.credentials,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    exposeHeaders: ['X-RateLimit-Remaining', 'X-RateLimit-Reset', 'X-RateLimit-Total'],
    maxAge: 86400, // 24小时
  }),
);

/**
 * 静态文件中间件配置
 * 提供静态资源服务
 */
App.use(
  serve(path.join(__dirname, './static'), {
    maxage: 10 * 60 * 1000, // 10分钟缓存
    gzip: true,
    hidden: false,
    index: false,
  }),
);

/**
 * 请求体解析中间件配置
 * 解析JSON、表单和文本请求体
 */
App.use(
  bodyParser({
    enableTypes: ['json', 'form', 'text'],
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb',
    strict: true,
    onerror: (err, ctx) => {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: '请求体解析失败',
        error: err.message,
      };
    },
  }),
);

/**
 * 路由注册
 * 注册所有API路由
 */
Object.keys(routers).forEach(routeName => {
  const router = routers[routeName];
  App.use(router.routes()).use(router.allowedMethods());
});

/**
 * 404处理中间件
 * 处理未找到的路由
 */
App.use(async ctx => {
  ctx.status = 404;
  ctx.body = {
    code: 404,
    message: '接口不存在',
    path: ctx.path,
    method: ctx.method,
    timestamp: new Date().toISOString(),
  };
});

module.exports = App;
