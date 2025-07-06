/**
 * 房屋子表信息路由
 * 处理房屋子表信息数据相关的API请求
 */
const Router = require('koa-router');
const houseChildrenInfoRouter = new Router();
const houseChildrenInfoCont = require('../controllers/houseChildrenInfo');
const routerCommonExt = require('./routerCommonExt');

// 注册通用CRUD路由
routerCommonExt(houseChildrenInfoRouter, houseChildrenInfoCont, '/houseChildrenInfo/:tableId');

// 批量创建记录
houseChildrenInfoRouter.post(
  '/houseChildrenInfo/:tableId/bulkCreate',
  houseChildrenInfoCont.bulkCreate,
);

// 清空所有记录
houseChildrenInfoRouter.delete('/houseChildrenInfo/:tableId', houseChildrenInfoCont.destroyAll);

module.exports = houseChildrenInfoRouter;
