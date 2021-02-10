const houseChildrenModel = require('../models/houseChildren')
const commonExt = require('./commonExt')

module.exports = {
  ...commonExt(houseChildrenModel, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], { modelIsMethod: true }),
}
