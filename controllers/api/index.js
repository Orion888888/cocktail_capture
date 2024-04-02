const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const ingredientRoutes = require('./ingredientRoutes.js');
const recipeRoutes = require('./recipeRoutes.js');
const seedRoutes = require('./seedRoutes.js');

router.use('/users', usersRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/recipes', recipeRoutes);
router.use('/seed', seedRoutes);

module.exports = router;