const router = require('express').Router();
const { Recipes } = require('../models');
const axios = require('axios');
//const withAuth = require('../utils/auth');

// Route for default homepage showing 15 most recently posted recipes
router.get('/', async (req, res) => {
 try {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  /* 
    // Get 15 most recently posted recipes by the community
    const recipesData = await Recipes.findAll({
      attributes: ['id', 'name', 'date_created'],
      include: [{ model: Users, attributes: ['username'] }],
      order: [['date_created', 'DESC']],
      limit: 15
    });

    // Serialize data so the template can read it
    const recipes = recipesData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template */

    res.redirect('/menu'); 
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get ("/menu", async (req,res) => {
  try {
    const recipeData = await axios.get('http://www.thecocktaildb.com/api/json/v1/1/random.php')
    const { drinks } = recipeData.data
    const myDrinkArray = [] 
    for(let i = 0; i < 10; i++) {
      // Access random drink from the drinks array
      const randomDrink = drinks[Math.floor(Math.random() * drinks.length)]
      myDrinkArray.push(randomDrink)
    }
    // Render the menu template with drink data
    res.render("menu", { myDrinkArray, logged_in: req.session.logged_in })
  } catch (error) {
    console.log(error)
    res.status(500).send("Error fetching drink data")
  }
})


// Route for the login screen
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/menu');
    return;
  }

  res.render('login', {
    logged_in: req.session.logged_in
  });
});

// Route for the signup screen
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup', {
    logged_in: req.session.logged_in
  });
});

module.exports = router;