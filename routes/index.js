const router = require('express').Router();
const passport = require('passport');
const isAuthenticated = require("../middleware/authenticate");

router.get("/", (req, res) => {
  //#swagger.tags=["Hello World"]
  try {
    res.send('RR-Character-Manager - CSE 341 Final Project. ' + (req.session.user ? `Logged in as ${req.session.user.username}` : 'Not logged in: <a href="/auth">Login with GitHub</a>'));
  } catch (error) {
    console.error(error);
  }
});

// Use routes
router.use('/character', isAuthenticated, require('./characterRoutes'));
router.use("/player", isAuthenticated, require("./userRoutes"));
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