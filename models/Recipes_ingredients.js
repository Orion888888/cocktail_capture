const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipes_ingredients extends Model {}

Recipes_ingredients.init(
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
    modelName: 'recipes_ingredients'
  }
);

module.exports = Recipes_ingredients;