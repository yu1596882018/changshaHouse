const Router = require('koa-router')
const houseEnterListRouter = new Router()
const houseEnterListCont = require('../controllers/houseEnterList')
const routerCommonExt = require('./routerCommonExt')

routerCommonExt(houseEnterListRouter, houseEnterListCont, '/houseEnterList')

module.exports = houseEnterListRouter
