const Router = require('koa-router')
const houseInfoListRouter = new Router()
const houseInfoListCont = require('../controllers/houseInfoList')
const routerCommonExt = require('./routerCommonExt')

routerCommonExt(houseInfoListRouter, houseInfoListCont, '/houseInfoList')

module.exports = houseInfoListRouter
