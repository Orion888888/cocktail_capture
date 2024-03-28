const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Liked_recipes extends Model {}

Liked_recipes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    star_value: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'liked_recipes'
  }
);

module.exports = Liked_recipes;