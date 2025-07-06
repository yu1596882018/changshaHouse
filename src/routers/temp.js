/**
 * 临时数据路由
 * 处理临时数据相关的API请求
 */
const Router = require('koa-router')
const tempRouter = new Router()
const tempCont = require('../controllers/temp')
const routerCommonExt = require('./routerCommonExt')

// 注册通用CRUD路由
routerCommonExt(tempRouter, tempCont, '/temp')

// 添加临时数据接口
tempRouter.get('/addTemp', tempCont.getAddCont)

module.exports = tempRouter
