const express = require('express');
const router = express.Router();

//Route to render the cart page
router.get('/', (req, res) => {
    //retrieving user cart items from database
    const cartItems = [];

    //Render the 'cart' template and pass the cart items as data
    res.render('cart', {cartItems});
});

module.exports = router;