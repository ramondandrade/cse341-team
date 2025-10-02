const router = require('express').Router();

// Import route modules
const characterRoutes = require('./characterRoutes');

// Use routes
router.use('/character', characterRoutes);

router.use("/player", require("./userRoutes"));


module.exports = router;