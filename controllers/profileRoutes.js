const router = require('express').Router();
const { Users, Recipes, Liked_recipes } = require('../models');
const withAuth = require('../utils/auth');

// Default profile route showing most recently created recipes
router.get('/', withAuth, async (req, res) => {
    try {
      // Get all recipes created by logged in user
      // const recipesData = await Recipes.findAll({
      //   attributes: ['id', 'name', 'date_created'],
      //   include: [{ model: Liked_recipes, attributes: ['star_value'] }],
      //   order: [['date_created', 'DESC']],
      //   where: { users_id: req.session.user_id }
      // });
      const user = await Users.findByPk(req.session.user_id, {include:[Recipes]})
        console.log(user);
  
      // Pass serialized data and session flag into template
      res.render('profile', {
        user,
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
        include: [{ model: Recipes, attributes: ['id', 'name', 'users_id', 'date_created'] }],
        include: [{ model: Users, attributes: ['username'] }],
        order: [['date_created', 'DESC']],
        where: { users_id: req.session.user_id }
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