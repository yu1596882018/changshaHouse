/**
 * 通用数据模型基类
 * 提供基础的CRUD操作方法
 */
class Common {
  /**
   * 构造函数
   * @param {Object} model Sequelize模型实例
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * 创建单条记录
   * @param {Object} data 要创建的数据
   * @returns {Promise<Object>} 创建的记录
   */
  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.error('创建记录失败:', error.message);
      throw error;
    }
  }

  /**
   * 批量创建记录
   * @param {Array} dataArray 要创建的数据数组
   * @returns {Promise<Array>} 创建的记录数组
   */
  async bulkCreate(dataArray) {
    try {
      const result = await this.model.bulkCreate(dataArray);
      return result;
    } catch (error) {
      console.error('批量创建记录失败:', error.message);
      throw error;
    }
  }

  /**
   * 删除记录
   * @param {Object} where 删除条件
   * @param {Object} options 删除选项
   * @returns {Promise<number>} 删除的记录数量
   */
  async destroy(where, options = {}) {
    try {
      const result = await this.model.destroy({
        where,
        ...options,
      });
      return result;
    } catch (error) {
      console.error('删除记录失败:', error.message);
      throw error;
    }
  }

  /**
   * 更新记录
   * @param {Object} data 要更新的数据
   * @param {Object} where 更新条件
   * @returns {Promise<Array>} 更新的记录数量
   */
  async update(data, where) {
    try {
      const result = await this.model.update(data, {
        where,
      });
      return result;
    } catch (error) {
      console.error('更新记录失败:', error.message);
      throw error;
    }
  }

  /**
   * 查询单条记录
   * @param {Object} where 查询条件
   * @param {Object} options 查询选项
   * @returns {Promise<Object|null>} 查询结果
   */
  async findOne(where, options = {}) {
    try {
      const result = await this.model.findOne({
        where,
        ...options,
      });
      return result;
    } catch (error) {
      console.error('查询单条记录失败:', error.message);
      throw error;
    }
  }

  /**
   * 查询多条记录
   * @param {Object} where 查询条件
   * @param {number} offset 偏移量
   * @param {number} limit 限制数量
   * @param {Object} options 查询选项
   * @returns {Promise<Array>} 查询结果数组
   */
  async findAll(where = {}, offset = 0, limit = null, options = {}) {
    try {
      const queryOptions = {
        where,
        ...options,
      };

      if (offset > 0) {
        queryOptions.offset = offset;
      }

      if (limit && limit > 0) {
        queryOptions.limit = limit;
      }

      const result = await this.model.findAll(queryOptions);
      return result;
    } catch (error) {
      console.error('查询多条记录失败:', error.message);
      throw error;
    }
  }

  /**
   * 统计记录数量
   * @param {Object} where 统计条件
   * @returns {Promise<number>} 记录数量
   */
  async count(where = {}) {
    try {
      const result = await this.model.count({
        where,
      });
      return result;
    } catch (error) {
      console.error('统计记录数量失败:', error.message);
      throw error;
    }
  }

  /**
   * 分页查询（包含总数）
   * @param {Object} where 查询条件
   * @param {number} offset 偏移量
   * @param {number} limit 限制数量
   * @param {Object} options 查询选项
   * @returns {Promise<Object>} 包含rows和count的对象
   */
  async findAndCountAll(where = {}, offset = 0, limit = 20, options = {}) {
    try {
      const result = await this.model.findAndCountAll({
        where,
        offset,
        limit,
        ...options,
      });
      return result;
    } catch (error) {
      console.error('分页查询失败:', error.message);
      throw error;
    }
  }

  /**
   * 根据主键查找记录
   * @param {string|number} id 主键值
   * @param {Object} options 查询选项
   * @returns {Promise<Object|null>} 查询结果
   */
  async findByPk(id, options = {}) {
    try {
      const result = await this.model.findByPk(id, options);
      return result;
    } catch (error) {
      console.error('根据主键查询失败:', error.message);
      throw error;
    }
  }

  /**
   * 检查记录是否存在
   * @param {Object} where 查询条件
   * @returns {Promise<boolean>} 是否存在
   */
  async exists(where) {
    try {
      const count = await this.count(where);
      return count > 0;
    } catch (error) {
      console.error('检查记录存在性失败:', error.message);
      throw error;
    }
  }
}

module.exports = Common;
