class Common {
  constructor(example) {
    this.example = example
  }

  /**
   * 单个增
   * @param data
   * @returns {Promise<void>}
   */
  async create(data) {
    const result = await this.example.create(data)
    return result
  }

  /**
   * 批量增
   * @param dataArray
   * @param updateOnDuplicate
   * @returns {Promise<*>}
   */
  async bulkCreate(dataArray, updateOnDuplicate = true) {
    const result = await this.example.bulkCreate(dataArray, {
      updateOnDuplicate,
    })
    return result
  }

  /**
   * 删
   * @param where
   * @returns {Promise<void>}
   */
  async destroy(where) {
    const result = await this.example.destroy({
      where,
    })
    return result
  }

  /**
   * 改
   * @param data
   * @param where
   * @returns {Promise<void>}
   */
  async update(data, where) {
    const result = await this.example.update(data, {
      where,
    })
    return result
  }

  /**
   * 单个查
   * @param where
   * @returns {Promise<*>}
   */
  async findOne(where) {
    const result = await this.example.findOne({
      where,
    })
    return result
  }

  /**
   * 批量查
   * @param where
   * @returns {Promise<*>}
   */
  async findAll(where, offset, limit) {
    const result = await this.example.findAll({
      where,
      offset,
      limit,
    })
    return result
  }

  /**
   * 聚合次数
   * @param where
   * @returns {Promise<void>}
   */
  async count(where) {
    const result = await this.example.count({
      where,
    })

    return result
  }

  /**
   * 查询次数与结果，一般用于分页查询
   * @param where
   * @returns {Promise<*>}
   */
  async findAndCountAll(where, offset, limit) {
    const result = await this.example.findAndCountAll({
      where,
      offset,
      limit,
    })

    return result
  }
}

module.exports = Common
