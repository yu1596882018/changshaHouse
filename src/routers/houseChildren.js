/**
 * 房屋子表路由
 * 处理房屋子表数据相关的API请求
 */
const Router = require('koa-router');
const houseChildrenRouter = new Router();
const houseChildrenCont = require('../controllers/houseChildren');
const routerCommonExt = require('./routerCommonExt');

// 注册通用CRUD路由
routerCommonExt(houseChildrenRouter, houseChildrenCont, '/houseChildren/:tableId');

// 批量创建记录
houseChildrenRouter.post('/houseChildren/:tableId/bulkCreate', houseChildrenCont.bulkCreate);

// 清空所有记录
houseChildrenRouter.delete('/houseChildren/:tableId', houseChildrenCont.destroyAll);

module.exports = houseChildrenRouter;
