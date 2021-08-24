const { logUtil } = require('./../utils')

module.exports = {
  async reportMonitor(ctx, next) {
    const reqBody = ctx.request.body
    if (reqBody.category === 'performance') {
      logUtil.webPerformance(ctx)
    } else if (reqBody.category === 'network_speed') {
      logUtil.webNetworkSpeed(ctx)
    } else {
      logUtil.webError(ctx)
    }
    ctx.body = 'success'
  },
}
