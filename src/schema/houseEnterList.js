/**
 * 入住项目信息表模型定义
 * @param {import('sequelize').Sequelize} sequelize Sequelize实例
 * @param {import('sequelize').DataTypes} DataTypes 数据类型
 * @returns {import('sequelize').Model}
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'house_enter_list',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '主键ID',
      },
      a: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '项目名称',
      },
      b: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '项目坐落',
      },
      c: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '预售证号',
      },
      d: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '发证日期',
      },
      e_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '小区id',
      },
    },
    {
      sequelize,
      tableName: 'house_enter_list',
      timestamps: false,
      comment: '入住项目信息表',
    },
  )
}
