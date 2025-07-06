/**
 * 房屋信息列表控制器
 * 提供房屋信息列表数据的增删改查操作
 */
const houseInfoListModel = require('../models/houseInfoList');
const commonExt = require('./commonExt');

// 定义属性名称数组
const attrNames = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
];

module.exports = {
  ...commonExt(houseInfoListModel, attrNames),
};
