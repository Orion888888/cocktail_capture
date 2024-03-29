const Users = require('./Users4');
const Recipes = require('./Recipes4');
const Liked_recipes = require('./Liked_recipes4');
const Ingredients = require('./Ingredients4');
const Recipes_ingredients = require('./Recipes_ingredients');
const Shopping_list = require('./Shopping_list4');
const Shopping_list_recipes = require('./Shopping_list_recipes');

// Needed to define the foreign key types for the many to many associations
const { DataTypes } = require('sequelize');


// User associations
Users.hasMany(Recipes, {
    foreignKey: 'users_id',
    onDelete: 'CASCADE'
});

Recipes.belongsTo(Users, {
    foreignKey: 'users_id'
});

Users.hasOne(Shopping_list, {
    foreignKey: 'users_id',
    onDelete: 'CASCADE'
});

Shopping_list.belongsTo(Users, {
    foreignKey: 'users_id',
});


// Liked_recipes associations
Users.belongsToMany(Recipes, { through: Liked_recipes, foreignKey: { name: 'users_id', type: DataTypes.INTEGER } });

Recipes.belongsToMany(Users, { through: Liked_recipes, foreignKey: { name: 'recipes_id', type: DataTypes.INTEGER } });


// Recipes_ingredients associtions
Recipes.belongsToMany(Ingredients, { through: Recipes_ingredients, foreignKey: { name: 'recipes_id', type: DataTypes.INTEGER } });

Ingredients.belongsToMany(Recipes, { through: Recipes_ingredients, foreignKey: { name: 'ingredients_id', type: DataTypes.INTEGER } });


// Shopping_list_recipes associations
Shopping_list.belongsToMany(Recipes, { through: Shopping_list_recipes, foreignKey: { name: 'shopping_list_id', type: DataTypes.INTEGER } });

Recipes.belongsToMany(Shopping_list, { through: Shopping_list_recipes, foreignKey: { name: 'recipes_id', type: DataTypes.INTEGER } });


module.exports = {
    Users,
    Recipes,
    Liked_recipes,
    Ingredients,
    Recipes_ingredients,
    Shopping_list,
    Shopping_list_recipes
};