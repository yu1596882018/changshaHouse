const tempModel = require('../models/temp')
const commonExt = require('./commonExt')

module.exports = {
  ...commonExt(tempModel, ['a', 'b', 'c']),
}
