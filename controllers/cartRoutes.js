const express = require('express');
const router = express.Router();

//Route to add item to cart
router.post('/:drinkId', async (req, res) => {
    const drinkId = req.params.drinkId;
    try {
        const cartItem = await CartItem.create({ user_id: req.session.user_id, drinkId });
    
    //success response
    res.sendStatus(200);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.sendStatus(500);
    }
});

module.exports = router;