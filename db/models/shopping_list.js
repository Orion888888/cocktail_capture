const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class shopping_list extends Model {}


shopping_list.init(
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
    },
    recipes_id: {
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

module.exports = shopping_list;