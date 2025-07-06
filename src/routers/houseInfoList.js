/**
 * 房屋信息列表路由
 * 处理房屋信息列表数据相关的API请求
 */
const Router = require('koa-router');
const houseInfoListRouter = new Router();
const houseInfoListCont = require('../controllers/houseInfoList');
const routerCommonExt = require('./routerCommonExt');

// 注册通用CRUD路由
routerCommonExt(houseInfoListRouter, houseInfoListCont, '/houseInfoList');

module.exports = houseInfoListRouter;
