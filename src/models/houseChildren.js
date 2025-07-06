/**
 * 房屋子表数据模型
 * 提供房屋子表数据的数据库操作
 */
const sequelize = require('sequelize')
const houseChildrenSchema = require('./../schema/houseChildren')
const config = require('../config')
const mysqlDb = require('../db/mysql')
const CommonApi = require('./common')

/**
 * 房屋子表模型类
 * 继承通用模型基类
 */
class HouseChildrenModel extends CommonApi {
  /**
   * 构造函数
   * @param {Object} example Sequelize模型实例
   */
  constructor(example) {
    super(example)
  }
}

// 缓存模型实例
const exampleList = {}
const modelList = {}

/**
 * 获取房屋子表模型实例
 * @param {string} tableId 表ID
 * @returns {Promise<HouseChildrenModel>} 模型实例
 */
module.exports = async (tableId) => {
  try {
    // 检查参数
    if (!tableId) {
      throw new Error('tableId参数不能为空')
    }

    let example = exampleList[tableId]
    
    // 如果配置了MySQL连接且模型不存在，则创建新模型
    if (config.connectMysql && !example) {
      example = exampleList[tableId] = houseChildrenSchema(mysqlDb, sequelize.DataTypes, { tableId })
      await example.sync()
    }

    // 返回缓存的模型实例或创建新实例
    if (!modelList[tableId]) {
      return (modelList[tableId] = new HouseChildrenModel(example))
    } else {
      return modelList[tableId]
    }
  } catch (error) {
    console.error('获取房屋子表模型失败:', error.message)
    throw error
  }
}
