const sequelize = require('../config/connection');
const { Ingredients, Recipes, Shopping_list, Users } = require('../models');
const { Liked_recipes, Recipes_ingredients, Shopping_list_recipes } = require('../models');

const ingredientsData = require('./ingredientsData.json');
const recipesData = require('./recipesData.json');
const shopping_listData = require('./shopping_listData.json');
const usersData = require('./usersData.json');
const liked_recipesData = require('./liked_recipesData.json');
const recipes_ingredientsData = require('./recipes_ingredientsData.json');
const shopping_list_recipesData = require('./shopping_list_recipesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Ensures that the user data as seeded in order so the incremented IDs are in sequence
  await sequelize.transaction(async (t) => {
    for (let u = 0; u < usersData.length; u++) {
      await Users.create(usersData[u], { transaction: t, individualHooks: true });
    }
  });

  await sequelize.transaction(async (t) => {
    for (let u = 0; u < ingredientsData.length; u++) {
      await Ingredients.create(ingredientsData[u], { transaction: t });
    }
  });

  await sequelize.transaction(async (t) => {
    for (let u = 0; u < recipesData.length; u++) {
      await Recipes.create(recipesData[u], { transaction: t });
    }
  });

  await sequelize.transaction(async (t) => {
    for (let u = 0; u < recipes_ingredientsData.length; u++) {
      await Recipes_ingredients.create(recipes_inredientsData[u], { transaction: t });
    }
  });

  process.exit(0);
};

seedDatabase();