const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shopping_list extends Model {}

Shopping_list.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'shopping_list'
  }
);

module.exports = Shopping_list;