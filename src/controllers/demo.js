const demoModel = require('../models/demo')
const commonExt = require('./commonExt')

module.exports = {
  ...commonExt(demoModel, ['attr1', 'attr2']),
}
