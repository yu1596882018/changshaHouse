/**
 * 监控报告路由
 * 处理系统监控相关的API请求
 */
const Router = require('koa-router');
const restsRouter = new Router();
const restsCont = require('../controllers/rests');

// 监控报告接口
restsRouter.post('/reportMonitor', restsCont.reportMonitor);

module.exports = restsRouter;
