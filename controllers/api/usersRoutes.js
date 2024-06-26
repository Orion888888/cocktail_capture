const router = require('express').Router();
const { Users, Shopping_list } = require('../../models');

// API route to create a new user on signup
router.post('/', async (req, res) => {
  try {
    const userData = await Users.create(req.body);
    await shoppingList(userData.id);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//create shopping list id
 const shoppingList = async (user_id) => {
    try {
      const response = await Shopping_list.create({user_id: user_id});
      return await response.json();
  } catch (err) {
    console.log(err);
  }};

// API route to check user authentification against the database
router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// API route to logout of account on application
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;