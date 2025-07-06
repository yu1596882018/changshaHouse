/**
 * 临时信息表模型定义
 * 用于存储临时token和用户信息
 * @param {import('sequelize').Sequelize} sequelize Sequelize实例
 * @param {import('sequelize').DataTypes} DataTypes 数据类型
 * @returns {import('sequelize').Model}
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'temp',
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
        comment: 'token',
      },
      b: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '用户名称',
      },
      c: {
        type: DataTypes.STRING(10000),
        allowNull: true,
        comment: '用户信息',
      },
    },
    {
      sequelize,
      tableName: 'temp',
      timestamps: false,
      comment: '临时信息表',
    },
  )
}
