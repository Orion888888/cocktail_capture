const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe_ingredients extends Model {}

Recipe_ingredients.init(
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
    modelName: 'recipe_ingredients'
  }
);

module.exports = Recipe_ingredients;