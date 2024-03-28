const Users = require('./Users');
const Recipes = require('./Recipes');
const Liked_recipes = require('./Liked_recipes');
const Ingredients = require('./Ingredients');
const Recipes_ingredients = require('./Recipes_ingredients.js');
const Shopping_list = require('./Shopping_list');
const Shopping_list_recipes = require('./Shopping_list_recipes.js');

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

Shopping_list.hasOne(Users, {
    foreignKey: 'users_id',
});


// Liked_recipes associations
Recipes.belongsToMany(Users, { through: Liked_recipes, foreignKey: { name: 'recipes_id', type: DataTypes.INTEGER } });

Users.belongsToMany(Recipes, { through: Liked_recipes, foreignKey: { name: 'users_id', type: DataTypes.INTEGER } });


// Recipe_ingredients associtions
Ingredients.belongsToMany(Recipes, { through: Recipes_ingredients, foreignKey: { name: 'ingredients_id', type: DataTypes.INTEGER } });

Recipes.belongsToMany(Ingredients, { through: Recipes_ingredients, foreignKey: { name: 'recipes_id', type: DataTypes.INTEGER } });


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