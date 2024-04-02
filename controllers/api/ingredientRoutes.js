const router = require('express').Router();
const { Recipes_ingredients, Ingredients } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to add entries for what ingredients are associated with a recipe
router.post('/', withAuth, async (req, res) => {
    try {
        const ingredients = await Recipes_ingredients.create({
            ...req.body
        });
        res.status(200).json(ingredients);
    } catch (err) {
        res.status(400).json(err);
    }
});


// Route to return an ingredient ID by matching name
router.get('/:name', withAuth, async (req, res) => {
    try {
        const ingredientId = await Ingredients.findOne({ where: { name: req.params.name } });

        if (ingredientId) {
            res.status(200).json(ingredientId);
          } else {
            res.status(404).json({ message: 'Ingredient not found' });
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });

module.exports = router;