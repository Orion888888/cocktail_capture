const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class liked_recipes extends Model {}


liked_recipes.init(
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

module.exports = liked_recipes;