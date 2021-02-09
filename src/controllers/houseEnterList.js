const houseEnterListModel = require('../models/houseEnterList')
const commonExt = require('./commonExt')

module.exports = {
  ...commonExt(houseEnterListModel, ['a', 'b', 'c', 'd', 'e_id']),
}
