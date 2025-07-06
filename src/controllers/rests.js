const { logUtil } = require('../utils');

/**
 * 监控报告控制器
 * 处理前端性能监控数据
 */
module.exports = {
  /**
   * 报告监控数据
   * @param {Object} ctx Koa上下文
   * @param {Function} next 下一个中间件
   */
  async reportMonitor(ctx, next) {
    try {
      const reqBody = ctx.request.body;
      
      // 验证请求体
      if (!reqBody || !reqBody.category) {
        ctx.status = 400;
        ctx.body = {
          code: 400,
          message: '缺少必要的监控类别参数',
        };
        return;
      }

      // 根据监控类别处理不同类型的监控数据
      switch (reqBody.category) {
        case 'performance':
          logUtil.webPerformance(ctx);
          break;
        case 'network_speed':
          logUtil.webNetworkSpeed(ctx);
          break;
        case 'error':
          logUtil.webError(ctx);
          break;
        default:
          logUtil.webError(ctx);
          break;
      }

      ctx.body = {
        code: 200,
        message: '监控数据上报成功',
        data: {
          category: reqBody.category,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('监控数据上报失败:', error.message);
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '监控数据上报失败',
        error: error.message,
      };
    }
  },
};
