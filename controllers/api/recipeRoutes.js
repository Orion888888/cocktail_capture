const router = require('express').Router();
const axios = require('axios');
const { Recipes } = require('../../models');
const withAuth = require('../../utils/auth');

//api request to create a new recipe
router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipes.create({
      ...req.body,
      users_id: req.session.user_id
    });
    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Route to update recipe
router.put(':id', withAuth, async (req, res) => {
  try {
    // Get reciped to update by id
    const updateRecipe = await Recipes.update({
      ...req.body,
      where: { id: req.params.id }
    });

    // Pass serialized data and session flag into template
    const recipe = updateRecipe.map((recipe) => recipe.get({ plain: true }));

    const updated = true;

    res.status(200).json(recipe);

    res.render('updatedelete', {
      recipe,
      updated,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete recipe
router.delete(':id', withAuth, async (req, res) => {
  try {
    // Get recipe to delete by id
    const deleteRecipe = await Recipes.destroy({
      where: { id: req.params.id }
    });

    res.status(200).json(deleteRecipe);

    document.location.replace('/profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:drinkId', async (req, res) => {
  try {
    const drinkId = req.params.drinkId;

    // Fetch recipe data from an external API based on drinkId
    const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007${drinkId}`);

    // Process the fetched recipe data
    const recipe = data.recipe;

    // Get the user from the database (assuming you have a User model)
    const userId = req.session.user_id; // Assuming you're using sessions for user authentication
    const user = await User.findByPk(userId);

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

module.exports = router;
