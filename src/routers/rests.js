const Router = require('koa-router')
const restsRouter = new Router()
const restsCont = require('../controllers/rests')

restsRouter.post('/reportMonitor', restsCont.reportMonitor)

module.exports = restsRouter
