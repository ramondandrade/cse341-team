const router = require('express').Router();

// Import route modules
const characterRoutes = require('./characterRoutes');

// Use routes
router.use('/character', characterRoutes);

module.exports = router;