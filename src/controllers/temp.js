const tempModel = require('../models/temp')
const commonExt = require('./commonExt')

const attrNames = ['a', 'b', 'c']
module.exports = {
  ...commonExt(tempModel, attrNames),
  async getAddCont(ctx, next) {
    let options = {}

    attrNames.forEach((attrName) => {
      let val = ctx.request.query[attrName]
      if (val !== undefined) {
        options[attrName] = val
      }
    })

    let result = await tempModel.create(options)

    ctx.body = result
    await next()
  },
}
