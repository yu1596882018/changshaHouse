/**
 * 房屋子表信息控制器
 * 提供房屋子表信息数据的增删改查操作
 */
const houseChildrenInfoModel = require('../models/houseChildrenInfo')
const commonExt = require('./commonExt')

// 定义属性名称数组
const attrNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

module.exports = {
  ...commonExt(houseChildrenInfoModel, attrNames, { modelIsMethod: true }),

  /**
   * 批量创建记录
   * @param {Object} ctx Koa上下文
   * @param {Function} next 下一个中间件
   */
  async bulkCreate(ctx, next) {
    try {
      const { data } = ctx.request.body
      
      // 验证输入数据
      if (!data || !Array.isArray(data) || data.length === 0) {
        ctx.status = 400
        ctx.body = {
          code: 400,
          message: '缺少有效的批量数据',
        }
        return
      }

      // 验证数据条数限制
      if (data.length > 100) {
        ctx.status = 400
        ctx.body = {
          code: 400,
          message: '批量创建数据不能超过100条',
        }
        return
      }

      const model = await houseChildrenInfoModel(ctx.params.tableId)
      const result = await model.bulkCreate(data)

      ctx.body = {
        code: 200,
        message: '批量创建成功',
        data: {
          count: result.length,
          records: result,
        },
      }
    } catch (error) {
      console.error('批量创建记录失败:', error.message)
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: '批量创建记录失败',
        error: error.message,
      }
    }
  },

  /**
   * 清空所有记录
   * @param {Object} ctx Koa上下文
   * @param {Function} next 下一个中间件
   */
  async destroyAll(ctx, next) {
    try {
      const model = await houseChildrenInfoModel(ctx.params.tableId)
      
      // 使用truncate清空表
      await model.destroy({
        where: {},
        truncate: true,
      })

      ctx.body = {
        code: 200,
        message: '清空所有记录成功',
      }
    } catch (error) {
      console.error('清空所有记录失败:', error.message)
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: '清空所有记录失败',
        error: error.message,
      }
    }
  },
}
