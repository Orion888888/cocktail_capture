const router = require('express').Router();

const apiRoutes = require('./api');
const profileRoutes = require('./profileRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);

module.exports = router;