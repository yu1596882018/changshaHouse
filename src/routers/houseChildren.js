const Router = require('koa-router')
const houseChildrenRouter = new Router()
const houseChildrenCont = require('../controllers/houseChildren')
const routerCommonExt = require('./routerCommonExt')

routerCommonExt(houseChildrenRouter, houseChildrenCont, '/houseChildren/:tableId')

houseChildrenRouter.post('/houseChildren/:tableId/bulkCreate', houseChildrenCont.bulkCreate)

houseChildrenRouter.delete('/houseChildren/:tableId', houseChildrenCont.destroyAll)

module.exports = houseChildrenRouter
