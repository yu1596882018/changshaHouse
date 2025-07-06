const tempModel = require('../models/temp')
const commonExt = require('./commonExt')

/**
 * 临时数据控制器
 * 提供临时数据的CRUD操作
 */
const attrNames = ['a', 'b', 'c']

module.exports = {
  ...commonExt(tempModel, attrNames),
  
  /**
   * 创建临时数据
   * @param {Object} ctx Koa上下文
   * @param {Function} next 下一个中间件
   */
  async getAddCont(ctx, next) {
    try {
      const options = {}

      // 从查询参数中提取属性值
      attrNames.forEach((attrName) => {
        const val = ctx.request.query[attrName]
        if (val !== undefined && val !== null && val !== '') {
          options[attrName] = val
        }
      })

      // 验证是否有数据需要创建
      if (Object.keys(options).length === 0) {
        ctx.status = 400
        ctx.body = {
          code: 400,
          message: '缺少必要的参数',
          required: attrNames,
        }
        return
      }

      // 创建临时数据
      const result = await tempModel.create(options)

      ctx.body = {
        code: 200,
        message: '临时数据创建成功',
        data: result,
      }
    } catch (error) {
      console.error('创建临时数据失败:', error.message)
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: '创建临时数据失败',
        error: error.message,
      }
    }
  },
}
