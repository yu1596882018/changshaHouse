/**
 * 房屋进入列表控制器
 * 提供房屋进入列表数据的增删改查操作
 */
const houseEnterListModel = require('../models/houseEnterList');
const commonExt = require('./commonExt');

// 定义属性名称数组
const attrNames = ['a', 'b', 'c', 'd', 'e_id'];

module.exports = {
  ...commonExt(houseEnterListModel, attrNames),
};
