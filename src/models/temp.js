/**
 * 临时数据模型
 * 提供临时数据的数据库操作
 */
const config = require('../config');
const mysqlDb = require('../db/mysql');
const modelPath = '../schema/temp';
const CommonApi = require('./common');

/**
 * 临时模型类
 * 继承通用模型基类
 */
class TempModel extends CommonApi {
  /**
   * 构造函数
   * @param {Object} example Sequelize模型实例
   */
  constructor(example) {
    super(example);
  }
}

// 初始化模型实例
let example = null;

try {
  if (config.connectMysql) {
    example = mysqlDb.import(modelPath);
    example.sync();
  }
} catch (error) {
  console.error('初始化临时模型失败:', error.message);
}

module.exports = new TempModel(example);
