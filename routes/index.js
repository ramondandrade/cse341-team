const router = require('express').Router();
const passport = require('passport');
const isAuthenticated = require("../middleware/authenticate");

router.get("/", (req, res) => {
  //#swagger.tags=["Hello World"]
  try {
    res.send("<p>Hello World</p>");
  } catch (error) {
    console.error(error);
  }
});

// Use routes
router.use('/character', isAuthenticated, require('./characterRoutes'));
router.use("/player", require("./userRoutes"));
router.use('/quest', isAuthenticated, require('./questRoutes'));
router.use("/inventory", isAuthenticated, require("./itemRoutes"));
router.use("/", require("./swagger"));
router.use('/auth', passport.authenticate('github')); 
router.use('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;