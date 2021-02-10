const sequelize = require('sequelize')
const houseChildrenSchema = require('./../schema/houseChildren')
const config = require('../config')
const { mysqlDb } = require('../config/db')
const modelPath = '../schema/houseChildren'
const CommonApi = require('./common')

class HouseChildrenModel extends CommonApi {
  constructor(example) {
    super(example)
  }
}

const exampleList = {}
const modelList = {}

module.exports = (tableId) => {
  console.log('tableId', tableId)
  let example = exampleList[tableId]
  if (config.connectMysql && !example) {
    // example = mysqlDb.import(modelPath)
    example = exampleList[tableId] = houseChildrenSchema(mysqlDb, sequelize.DataTypes, { tableId })
    example.sync()
  }

  if (!modelList[tableId]) {
    return (modelList[tableId] = new HouseChildrenModel(example))
  } else {
    return modelList[tableId]
  }
}
