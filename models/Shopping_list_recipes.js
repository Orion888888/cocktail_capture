const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shopping_list_recipes extends Model {}

Shopping_list_recipes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
  }
);

module.exports = Shopping_list_recipes;