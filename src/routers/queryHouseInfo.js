const Router = require('koa-router')
const queryHouseInfoRouter = new Router()
const queryHouseInfoCont = require('../controllers/queryHouseInfo')

queryHouseInfoRouter.get('/getCodeImg', queryHouseInfoCont.getCodeImg)

queryHouseInfoRouter.post('/verifyCode', queryHouseInfoCont.verifyCode)

module.exports = queryHouseInfoRouter
