const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class my_recipes extends Model {}


my_recipes.init(
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
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'my_recipes'
  }
);

module.exports = my_recipes;