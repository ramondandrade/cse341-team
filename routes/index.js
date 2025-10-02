const router = require('express').Router();

// Import route modules
const characterRoutes = require('./characterRoutes');

router.get("/", (req, res) => {
  //#swagger.tags=["Hello World"]
  try {
    res.send("<p>Hello World</p>");
  } catch (error) {
    console.error(error);
  }
});

// Use routes
router.use('/character', characterRoutes);

router.use("/player", require("./userRoutes"));

router.use("/", require("./swagger"));

module.exports = router;