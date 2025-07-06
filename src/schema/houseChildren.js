/**
 * 房屋子表数据库模式
 * 定义房屋子表的数据结构
 * @param {Object} sequelize Sequelize实例
 * @param {Object} DataTypes 数据类型
 * @param {Object} extendOptions 扩展选项
 * @returns {Object} Sequelize模型
 */
module.exports = function(sequelize, DataTypes, extendOptions = {}) {
  const {tableId} = extendOptions;
  return sequelize.define(
    `house_children_${tableId}`,
    {
      // 主键ID
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '主键ID',
      },
      // 预售许可证号
      a: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '预售许可证号',
      },
      // 对应栋号
      b: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '对应栋号',
      },
      // 发证日期
      c: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '发证日期',
      },
      // 批准预售总面积(㎡)
      d: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '批准预售总面积(㎡)',
      },
      // 国土证号
      e: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '国土证号',
      },
      // 工程规划许可证号
      f: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '工程规划许可证号',
      },
      // 用地规划许可证号
      g: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '用地规划许可证号',
      },
      // 工程施工许可证
      h: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '工程施工许可证',
      },
      // 楼栋每户信息表id
      i: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '楼栋每户信息表id',
      },
      // 总户数
      j: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '总户数',
      },
      // 已售
      k: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '已售',
      },
      // 可售
      l: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '可售',
      },
    },
    {
      sequelize,
      tableName: `house_children_${tableId}`,
      timestamps: false,
      comment: '房屋子表',
    },
  );
};
