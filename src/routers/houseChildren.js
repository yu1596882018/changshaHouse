const Router = require('koa-router')
const houseChildrenRouter = new Router()
const houseChildrenCont = require('../controllers/houseChildren')
const routerCommonExt = require('./routerCommonExt')

routerCommonExt(houseChildrenRouter, houseChildrenCont, '/houseChildren/:tableId')

module.exports = houseChildrenRouter
