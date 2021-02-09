const config = require('../config')
const { mysqlDb } = require('../config/db')
const modelPath = '../schema/houseEnterList'
const CommonApi = require('./common')

let example = null
if (config.connectMysql) {
  example = mysqlDb.import(modelPath)
  example.sync()
}

class HouseEnterListModel extends CommonApi {
  constructor(example) {
    super(example)
  }
}

module.exports = new HouseEnterListModel(example)
