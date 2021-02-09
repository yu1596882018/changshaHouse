const houseInfoListModel = require('../models/houseInfoList')
const commonExt = require('./commonExt')

module.exports = {
  ...commonExt(houseInfoListModel, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w']),
}
