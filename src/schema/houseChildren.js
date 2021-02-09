module.exports = function(sequelize, DataTypes) {
  return sequelize.define('house_children', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    a: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '预售许可证号',
    },
    b: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '对应栋号',
    },
    c: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '发证日期',
    },
    d: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '批准预售总面积(㎡)',
    },
    e: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '国土证号',
    },
    f: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '工程规划许可证号',
    },
    g: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '用地规划许可证号',
    },
    h: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '工程施工许可证',
    },
    i: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '楼栋每户信息表id',
    },
  }, {
    sequelize,
    tableName: 'house_children',
    timestamps: false,
  })
}
