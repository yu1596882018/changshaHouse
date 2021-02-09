/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'demo',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      attr1: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      attr2: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      tableName: 'demo',
    },
  )
}
