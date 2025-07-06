/**
 * 通用控制器扩展
 * 提供基本的增、删、改、查逻辑复用
 * @param {Object} exampleModel 数据模型
 * @param {Array} attrNames 属性名称数组
 * @param {Object} options 配置选项
 * @returns {Object} 包含CRUD方法的对象
 */
module.exports = function(exampleModel, attrNames = [], options = {}) {
  const { modelIsMethod } = options;

  return {
    /**
     * 创建记录
     * @param {Object} ctx Koa上下文
     * @param {Function} next 下一个中间件
     */
    async addCont(ctx, next) {
      try {
        const options = {};

        // 从请求体中提取属性值
        attrNames.forEach((attrName) => {
          const val = ctx.request.body[attrName];
          if (val !== undefined && val !== null && val !== '') {
            options[attrName] = val;
          }
        });

        // 验证是否有数据需要创建
        if (Object.keys(options).length === 0) {
          ctx.status = 400;
          ctx.body = {
            code: 400,
            message: '缺少必要的参数',
            required: attrNames,
          };
          return;
        }

        const model = modelIsMethod ? (await exampleModel(ctx.params.tableId)) : exampleModel;
        const result = await model.create(options);

        ctx.body = {
          code: 200,
          message: '创建成功',
          data: result,
        };
      } catch (error) {
        console.error('创建记录失败:', error.message);
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: '创建记录失败',
          error: error.message,
        };
      }
    },

    /**
     * 删除记录
     * @param {Object} ctx Koa上下文
     * @param {Function} next 下一个中间件
     */
    async deleteCont(ctx, next) {
      try {
        const { id } = ctx.params;
        
        if (!id) {
          ctx.status = 400;
          ctx.body = {
            code: 400,
            message: '缺少记录ID',
          };
          return;
        }

        const model = modelIsMethod ? (await exampleModel(ctx.params.tableId)) : exampleModel;
        await model.destroy({
          where: { id },
        });

        ctx.body = {
          code: 200,
          message: '删除成功',
        };
      } catch (error) {
        console.error('删除记录失败:', error.message);
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: '删除记录失败',
          error: error.message,
        };
      }
    },

    /**
     * 更新记录（全量更新）
     * @param {Object} ctx Koa上下文
     * @param {Function} next 下一个中间件
     */
    async updateCont(ctx, next) {
      try {
        const { id } = ctx.params;
        
        if (!id) {
          ctx.status = 400;
          ctx.body = {
            code: 400,
            message: '缺少记录ID',
          };
          return;
        }

        const options = {};

        // 从请求体中提取属性值
        attrNames.forEach((attrName) => {
          const val = ctx.request.body[attrName];
          if (val !== undefined) {
            options[attrName] = val;
          }
        });

        const model = modelIsMethod ? (await exampleModel(ctx.params.tableId)) : exampleModel;
        await model.update(options, {
          where: { id },
        });

        ctx.body = {
          code: 200,
          message: '更新成功',
        };
      } catch (error) {
        console.error('更新记录失败:', error.message);
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: '更新记录失败',
          error: error.message,
        };
      }
    },

    /**
     * 部分更新记录
     * @param {Object} ctx Koa上下文
     * @param {Function} next 下一个中间件
     */
    async patchCont(ctx, next) {
      try {
        const { id } = ctx.params;
        
        if (!id) {
          ctx.status = 400;
          ctx.body = {
            code: 400,
            message: '缺少记录ID',
          };
          return;
        }

        const options = {};

        // 只更新提供的字段
        attrNames.forEach((attrName) => {
          const val = ctx.request.body[attrName];
          if (val !== undefined && val !== null && val !== '') {
            options[attrName] = val;
          }
        });

        const model = modelIsMethod ? (await exampleModel(ctx.params.tableId)) : exampleModel;
        await model.update(options, {
          where: { id },
        });

        ctx.body = {
          code: 200,
          message: '部分更新成功',
        };
      } catch (error) {
        console.error('部分更新记录失败:', error.message);
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: '部分更新记录失败',
          error: error.message,
        };
      }
    },

    /**
     * 查询单条记录
     * @param {Object} ctx Koa上下文
     * @param {Function} next 下一个中间件
     */
    async queryOneCont(ctx, next) {
      try {
        const { id } = ctx.params;
        
        if (!id) {
          ctx.status = 400;
          ctx.body = {
            code: 400,
            message: '缺少记录ID',
          };
          return;
        }

        const model = modelIsMethod ? (await exampleModel(ctx.params.tableId)) : exampleModel;
        const result = await model.findOne({
          where: { id },
        });

        if (!result) {
          ctx.status = 404;
          ctx.body = {
            code: 404,
            message: '记录不存在',
          };
          return;
        }

        ctx.body = {
          code: 200,
          message: '查询成功',
          data: result,
        };
      } catch (error) {
        console.error('查询单条记录失败:', error.message);
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: '查询单条记录失败',
          error: error.message,
        };
      }
    },

    /**
     * 查询所有记录（分页）
     * @param {Object} ctx Koa上下文
     * @param {Function} next 下一个中间件
     */
    async queryAllCont(ctx, next) {
      try {
        const options = { where: {} };

        // 从查询参数中提取过滤条件
        attrNames.forEach((attrName) => {
          const val = ctx.query[attrName];
          if (val !== undefined && val !== null && val !== '') {
            options.where[attrName] = val;
          }
        });

        const offset = parseInt(ctx.query.offset) || 0;
        const limit = parseInt(ctx.query.limit) || 10;

        // 验证分页参数
        if (offset < 0 || limit < 1 || limit > 100) {
          ctx.status = 400;
          ctx.body = {
            code: 400,
            message: '分页参数不正确',
          };
          return;
        }

        const model = modelIsMethod ? (await exampleModel(ctx.params.tableId)) : exampleModel;
        const result = await model.findAndCountAll({
          ...options,
          offset,
          limit,
        });

        ctx.body = {
          code: 200,
          message: '查询成功',
          data: {
            list: result.rows,
            total: result.count,
            page: Math.floor(offset / limit) + 1,
            limit,
          },
        };
      } catch (error) {
        console.error('查询所有记录失败:', error.message);
        ctx.status = 500;
        ctx.body = {
          code: 500,
          message: '查询所有记录失败',
          error: error.message,
        };
      }
    },
  };
};
