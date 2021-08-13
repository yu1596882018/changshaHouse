const { logUtil } = require('./../utils')
const { esClient } = require('./../config/db')

module.exports = {
  async reportMonitor(ctx, next) {
    const reqBody = ctx.request.body
    if (reqBody.category === 'performance') {
      logUtil.webPerformance(ctx, esClient)
    } else if (reqBody.category === 'network_speed') {
      logUtil.webNetworkSpeed(ctx, esClient)
    } else {
      logUtil.webError(ctx, esClient)
    }
    ctx.body = 'success'
  },
}
