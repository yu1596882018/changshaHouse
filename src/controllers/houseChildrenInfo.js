const houseChildrenInfoModel = require('../models/houseChildrenInfo')
const commonExt = require('./commonExt')

module.exports = {
  ...commonExt(houseChildrenInfoModel, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], { modelIsMethod: true }),
}
