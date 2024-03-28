const sequelize = require('../config/connection');
const { Ingredients, Recipes, Shopping_list, Users } = require('../models');
const { Liked_recipes, Recipe_ingredients, Shopping_list_recipes } = require('../models');

const ingredientsData = require('./ingredientsData.json');
const recipesData = require('./recipesData.json');
const shopping_listData = require('./shopping_listData.json');
const usersData = require('./usersData.json');
const liked_recipesData = require('./liked_recipesData.json');
const recipe_ingredientsData = require('./recipe_ingredientsData.json');
const shopping_list_recipesData = require('./shopping_list_recipesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Ensures that the user data as seeded in order so the incremented IDs are in sequence
  await sequelize.transaction(async (t) => {
    for (let u = 0; u < usersData.length; u++) {
      await Users.create(usersData[u], { transaction: t, individualHooks: true });
    }
  });

  await Ingredients.bulkCreate(ingredientsData);

  await Recipes.bulkCreate(recipesData);

  await Recipe_ingredients.bulkCreate(recipe_ingredientsData);

  process.exit(0);
};

seedDatabase();