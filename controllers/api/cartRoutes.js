const express = require('express');
const router = express.Router();
const { Users, Recipes, Liked_recipes, Ingredients, Recipes_ingredients, Shopping_list_recipes, Shopping_list } = require('../../models');
const withAuth = require('../../utils/auth');
const { data } = require('autoprefixer');



//Route to add item to cart
router.post('/:id', withAuth, async (req, res) => {
    try {
        const response = await Shopping_list.findOne({where: {user_id: req.session.user_id}});
        const data = response.get({ plain: true });
        console.log(data);
        const cartId = data.id;
        const cartItem = await Shopping_list_recipes.create({ recipes_id: req.params.id, shopping_list_id: cartId});

        //success response
        res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.sendStatus(500);
    };

});

//Make a remove 


module.exports = router;
