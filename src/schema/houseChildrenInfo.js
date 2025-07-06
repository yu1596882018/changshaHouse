/**
 * 户室信息表模型定义
 * 动态表名，适用于分表场景
 * @param {import('sequelize').Sequelize} sequelize Sequelize实例
 * @param {import('sequelize').DataTypes} DataTypes 数据类型
 * @param {Object} extendOptions 扩展选项，需包含tableId
 * @returns {import('sequelize').Model}
 */
module.exports = function(sequelize, DataTypes, extendOptions = {}) {
  const {tableId} = extendOptions;
  return sequelize.define(
    `house_children_info_${tableId}`,
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
        comment: '户室号',
      },
      b: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '楼层',
      },
      c: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '房屋用途',
      },
      d: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '房屋类型',
      },
      e: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '装修状态',
      },
      f: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '建筑面积',
      },
      g: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '套内面积',
      },
      h: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '分摊面积',
      },
      i: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '销售状态',
      },
    },
    {
      sequelize,
      tableName: `house_children_info_${tableId}`,
      timestamps: false,
      comment: '户室信息分表',
    },
  );
};
