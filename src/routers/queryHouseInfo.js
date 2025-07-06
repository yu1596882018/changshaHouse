const Router = require('koa-router')
const queryHouseInfoCont = require('../controllers/queryHouseInfo')

// 创建路由实例，设置前缀
const queryHouseInfoRouter = new Router({
  prefix: '/api/v1/houses',
})

/**
 * 获取验证码图片
 * GET /api/v1/houses/captcha
 */
queryHouseInfoRouter.get('/captcha', queryHouseInfoCont.getCodeImg)

/**
 * 验证预售证号
 * POST /api/v1/houses/verify
 */
queryHouseInfoRouter.post('/verify', queryHouseInfoCont.verifyCode)

/**
 * 收集房源信息
 * GET /api/v1/houses/collect
 */
queryHouseInfoRouter.get('/collect', queryHouseInfoCont.collectHouseInfo)

module.exports = queryHouseInfoRouter
