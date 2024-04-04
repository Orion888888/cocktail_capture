const router = require('express').Router();
const { Users, Recipes, Liked_recipes, Ingredients, Recipes_ingredients, Shopping_list_recipes, Shopping_list } = require('../models');
const withAuth = require('../utils/auth');

//Adding to Bar via my cart
router.get("/cart", withAuth, async (req, res) => {
  try {
    // Get all recipes created by logged in user
    const response = await Shopping_list.findOne({ where: { user_id: req.session.user_id } });
    const data = response.get({ plain: true });
    console.log(data);
    const cartId = data.id;

    const recipesData = await Recipes.findAll({
      include: [
        {
          model: Shopping_list,
          through: {
            model: Shopping_list_recipes
          },
          where: {
            id: data.id // Add your specific filter condition here
          }
        }, Ingredients
      ],
      order: [['date_created', 'DESC']],
    });
    // Pass serialized data and session flag into template
    const recipes = recipesData.map((recipe) => recipe.get({ plain: true }));
    console.log('RECIPE DATA');
    console.log(recipes);
    // for (list of recipes) {
    //   console.log(list.ingredients);
    // };

    res.render('cart', {
      recipes,
      none: (recipes.length === 0),
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }

});


//Shopping list button 

// Default profile route showing most recently created recipes
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all recipes created by logged in user
    const recipesData = await Recipes.findAll({
      // attributes: ['id', 'strDrink', 'strDrinkThumb', 'description', 'date_created'],
      include: [Ingredients, Shopping_list],
      //  include: [{ model: Liked_recipes, attributes: ['star_value'] }],
      order: [['date_created', 'DESC']],
      where: { user_id: req.session.user_id }
    });

    // Pass serialized data and session flag into template
    const initRecipes = recipesData.map((recipe) => recipe.get({ plain: true }));
    
    let recipes = [];

    for (item of initRecipes) {
      if (!item.shopping_lists.length > 0) {
        recipes.push(item);
      }
    };

    res.render('profile', {
      recipes,
      none: (recipes.length === 0),
      deleted: (req.query.deleted),
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the create recipe form
router.get('/create', withAuth, (req, res) => {
  res.render('create', {
    logged_in: req.session.logged_in
  });
});

// Route to render update/delete page for specific recipe
router.get('/update/:id', withAuth, async (req, res) => {

  try {
    // Get recipe data by primary key
    const recipeData = await Recipes.findByPk(req.params.id, {
      include: [Ingredients],
      attributes: ['id', 'strDrink', 'strDrinkThumb', 'description', 'date_created'],
    });

    // Pass serialized data and session flag into template
    const recipe = recipeData.get({ plain: true });

    console.log(recipe.ingredients);

    res.render('updatedelete', {
      recipe,
      updated: (req.query.updated),
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
router.get('/liked', withAuth, async (req, res) => {
  try {
    // Get 15 most recently post recipes by the community
    const recipesData = await Liked_recipes.findAll({
      include: [{ model: Recipes, attributes: ['id', 'name', 'user_id', 'date_created'] }],
      include: [{ model: Users, attributes: ['username'] }],
      order: [['date_created', 'DESC']],
      where: { user_id: req.session.user_id }
    });
 
    // Serialize data so the template can read it
    const recipes = recipesData.map((post) => post.get({ plain: true }));
 
    // Pass serialized data and session flag into template
    res.render('liked', {
      recipes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

/*
router.get('/list', withAuth, async (req, res) => {
  try {
    // Get 15 most recently post recipes by the community
    const recipesData = await Shopping_list.findAll({
      include: [{ model: Recipes, attributes: ['id', 'name'] }],
      include: [{ model: Users, attributes: ['username'] }],
      order: [['date_created', 'DESC']],
      where: { user_id: req.session.user_id }
    });
 
    // Serialize data so the template can read it
    const recipes = recipesData.map((post) => post.get({ plain: true }));
 
    // Pass serialized data and session flag into template
    res.render('liked', {
      recipes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); 
*/

module.exports = router;