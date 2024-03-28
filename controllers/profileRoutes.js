const router = require('express').Router();
const { Recipes, Liked_recipes } = require('../models');
const withAuth = require('../utils/auth');

// Default profile route showing most recently created recipes
router.get('/', withAuth, async (req, res) => {
    try {
      // Get 15 most recently post recipes by the community
      const recipesData = await Recipes.findAll({
        attributes: ['id', 'title'],
        include: [{ model: Users, attributes: ['id'] }],
        include: [{ model: Liked_recipes, attributes: ['star_value'] }],
        order: [['date_created', 'DESC']],
        where: { user_id: req.session.user_id }
      });
  
      // Serialize data so the template can read it
      const recipes = recipesData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('profile', {
        recipes,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/liked', withAuth, async (req, res) => {
    try {
      // Get 15 most recently post recipes by the community
      const recipesData = await Liked_recipes.findAll({
        attributes: ['id', 'title'],
        include: [{ model: Recipes, attributes: ['id', 'title', 'users_id'] }],
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

module.exports = router;