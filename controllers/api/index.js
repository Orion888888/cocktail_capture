const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const recipeRoutes = require('./recipeRoutes.js');

router.use('/users', usersRoutes);
router.use('/recipes', recipeRoutes);
module.exports = router;