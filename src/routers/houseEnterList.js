/**
 * 房屋进入列表路由
 * 处理房屋进入列表数据相关的API请求
 */
const Router = require('koa-router')
const houseEnterListRouter = new Router()
const houseEnterListCont = require('../controllers/houseEnterList')
const routerCommonExt = require('./routerCommonExt')

// 注册通用CRUD路由
routerCommonExt(houseEnterListRouter, houseEnterListCont, '/houseEnterList')

module.exports = houseEnterListRouter
