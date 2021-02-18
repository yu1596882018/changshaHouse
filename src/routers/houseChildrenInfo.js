const Router = require('koa-router')
const houseChildrenInfoRouter = new Router()
const houseChildrenInfoCont = require('../controllers/houseChildrenInfo')
const routerCommonExt = require('./routerCommonExt')

routerCommonExt(houseChildrenInfoRouter, houseChildrenInfoCont, '/houseChildrenInfo/:tableId')

module.exports = houseChildrenInfoRouter
