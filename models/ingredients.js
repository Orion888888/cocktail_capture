const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class ingredients extends Model {}


ingredients.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ingredients'
  }
);

module.exports = ingredients;