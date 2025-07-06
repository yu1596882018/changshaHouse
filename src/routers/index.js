/**
 * 路由索引文件
 * 统一导出所有路由模块
 */
const houseEnterList = require('./houseEnterList')
const houseInfoList = require('./houseInfoList')
const houseChildrenRouter = require('./houseChildren')
const houseChildrenInfoRouter = require('./houseChildrenInfo')
const queryHouseInfoRouter = require('./queryHouseInfo')
const tempRouter = require('./temp')
const restsRouter = require('./rests')

module.exports = {
  houseEnterList,
  houseInfoList,
  houseChildrenRouter,
  houseChildrenInfoRouter,
  queryHouseInfoRouter,
  tempRouter,
  restsRouter,
}
