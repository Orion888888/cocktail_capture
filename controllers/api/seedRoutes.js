const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Ingredients, Recipes, Shopping_list, Users } = require('../../models');
const { Liked_recipes, Recipes_ingredients, Shopping_list_recipes } = require('../../models');

const ingredientsData = require('../../seeds/ingredientsData.json');
const recipesData = require('../../seeds/recipesData.json');
const shopping_listData = require('../../seeds/shopping_listData.json');
const usersData = require('../../seeds/usersData.json');
//const liked_recipesData = require('../../seeds/liked_recipesData.json');
const recipes_ingredientsData = require('../../seeds/recipes_ingredientsData.json');
//const shopping_list_recipesData = require('../../seeds/shopping_list_recipesData.json');

//API request to seed the Render database
router.get('/', async (req, res) => {
    try {
        const seedDatabase = async () => {
            await sequelize.sync({ force: true });

            // Ensures that the user data as seeded in order so the incremented IDs are in sequence
            await sequelize.transaction(async (t) => {
                for (let u = 0; u < usersData.length; u++) {
                    await Users.create(usersData[u], { transaction: t, individualHooks: true });
                }
            });

            await sequelize.transaction(async (t) => {
                for (let u = 0; u < shopping_listData.length; u++) {
                  await Shopping_list.create(shopping_listData[u], { transaction: t });
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
                    await Recipes_ingredients.create(recipes_ingredientsData[u], { transaction: t });
                }
            });
        };

        seedDatabase();

        res.status(200).json('Database seeded successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;