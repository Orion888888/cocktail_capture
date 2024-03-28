const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class recipe_ingredients extends Model {}


recipe_ingredients.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    recipes_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ingredients_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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

module.exports = recipe_ingredients;