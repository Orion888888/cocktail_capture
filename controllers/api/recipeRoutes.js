const router = require('express').Router();
const axios = require('axios');
const { Recipes, Recipes_ingredients, Liked_recipes } = require('../../models');
const withAuth = require('../../utils/auth');

//api request to create a new recipe
router.post('/', withAuth, async (req, res) => {
    try {
      const newRecipe = await Recipes.create({
        strDrink: req.body.strDrink,
        description: req.body.description,
        user_id: req.session.user_id
      });
      res.status(200).json(newRecipe);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
// Route to update recipe
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Get reciped to update by id
    const updateRecipe = await Recipes.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );

    // Destroy all ingredient entries assigned to this recipe ID
    await Recipes_ingredients.destroy({ where: {recipes_id: req.params.id}});

    res.status(200).json(updateRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to add liked recipes to Top-Shelf
router.get('/liked', withAuth, async (req, res) => {
  try {
    // Fetch the liked recipes associated with the current user
    const userId = req.session.user_id;
    const likedRecipes = await Liked_recipes.findAll({ where: { user_id: userId } });
    
    const recipes = likedRecipes.map((recipe) => recipe.get({ plain: true }));
    console.log(recipes);
    // Render the liked.handlebars page with the liked recipes
    res.render('liked', { recipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add a recipe to liked recipes
router.post('/liked/:drinkId', withAuth, async (req, res) => {
  try {
    const drinkId = req.params.drinkId;
    const userId = req.session.user_id;

    // Check if the recipe is already in the user's liked recipes
    // const alreadyLiked = await Liked_recipes.findOne({ where: { user_id: userId, recipes_id: drinkId } });
    // if (alreadyLiked) {
    //   return res.status(400).json({ message: 'Recipe already liked' });
    // }

    // Adding the recipe to the user's liked recipes
    const likedRecipe = await Liked_recipes.create({ user_id: userId, recipes_id: drinkId }); // Ensure your model attributes match your database schema
    
    res.status(200).json(likedRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete recipe
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Get recipe to delete by id
    const deleteRecipe = await Recipes.destroy({
      where: { id: req.params.id }
    });

    res.status(200).json(deleteRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to return an ingredient ID by matching name
router.get('/ingredients', withAuth, async (req, res) => {
  try {
    const ingredientId = await Ingredients.findByPk(res.body);

  } catch (err) {
    res.status(500).json(err);
  }
});

/*
router.post('/:drinkId', async (req, res) => {
  try {
    const drinkId = req.params.drinkId;

    // Fetch recipe data from an external API based on drinkId
    const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007${drinkId}`);

    // Process the fetched recipe data
    const recipe = data.recipe;

    // Get the user from the database (assuming you have a User model)
    const userId = req.session.user_id; // Assuming you're using sessions for user authentication
    const user = await Users.findByPk(userId);

    // Add the recipe to the user's bar
    if (user) {
      await user.addRecipe(recipe);
      res.status(200).json({ message: 'Recipe added to user\'s bar successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/

module.exports = router;