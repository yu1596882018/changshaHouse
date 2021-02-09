/**
 * 基本增、删、改、查逻辑复用
 * @param exampleModel
 * @param attrNames
 * @returns {{addCont(*, *): Promise<void>, deleteCont(*, *): Promise<void>, updateCont(*, *): Promise<void>, queryCont(*, *): Promise<void>}}
 */
module.exports = function (exampleModel, attrNames = []) {
  return {
    async addCont(ctx, next) {
      let options = {}

      attrNames.forEach((attrName) => {
        let val = ctx.request.body[attrName]
        if (val !== undefined) {
          options[attrName] = val
        }
      })

      let result = await exampleModel.create(options)

      ctx.body = result
      await next()
    },

    async deleteCont(ctx, next) {
      await exampleModel.destroy({
        id: ctx.params.id,
      })

      ctx.body = 'success'
      await next()
    },

    async updateCont(ctx, next) {
      let options = {}

      attrNames.forEach((attrName) => {
        let val = ctx.request.body[attrName]
        // if (val !== undefined) {
        options[attrName] = val
        // }
      })

      await exampleModel.update(options, {
        id: ctx.params.id,
      })

      ctx.body = 'success'
      await next()
    },

    async patchCont(ctx, next) {
      let options = {}

      attrNames.forEach((attrName) => {
        let val = ctx.request.body[attrName]
        if (val !== undefined) {
          options[attrName] = val
        }
      })

      await exampleModel.update(options, {
        id: ctx.params.id,
      })

      ctx.body = 'success'
      await next()
    },

    async queryOneCont(ctx, next) {
      let result = await exampleModel.findOne({
        id: ctx.params.id,
      })

      ctx.body = result
      await next()
    },

    async queryAllCont(ctx, next) {
      let options = {}

      attrNames.forEach((attrName) => {
        let val = ctx.query[attrName]
        if (val !== undefined) {
          options[attrName] = val
        }
      })

      let result = await exampleModel.findAndCountAll(options, +ctx.query.offset || 0, +ctx.query.limit || 10)

      ctx.body = result
      await next()
    },
  }
}
