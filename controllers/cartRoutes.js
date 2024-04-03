const express = require('express');
const router = express.Router();
const { Users, Recipes, Liked_recipes, Ingredients, Recipes_ingredients, Shopping_list_recipes, Shopping_list } = require('../models');
const withAuth = require('../utils/auth');

// route to get cart handlebars
router.get("/cart", withAuth, async (req, res) => {
    try {
        res.render('cart');
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to add item to cart
router.post('/:id', withAuth, async (req, res) => {
    try {
        const cartId = await Shopping_list.findOne({where: {user_id: req.session.user_id}})
        const cartItem = await Shopping_list_recipes.create({ recipes_id: req.params.id, shopping_list_id: cartId});

        //success response
        res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.sendStatus(500);
    };

});

module.exports = router;
