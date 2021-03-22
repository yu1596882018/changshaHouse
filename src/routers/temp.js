const Router = require('koa-router')
const tempRouter = new Router()
const houseEnterListCont = require('../controllers/temp')
const routerCommonExt = require('./routerCommonExt')

routerCommonExt(tempRouter, houseEnterListCont, '/temp')

module.exports = tempRouter
