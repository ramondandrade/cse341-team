const router = require('express').Router();
const passport = require('passport');

// Use routes
router.use('/character', require('./characterRoutes'));
router.use("/player", require("./userRoutes"));
router.use("/quest", require("./questRoutes"));
router.use("/inventory", require("./itemRoutes"));
router.use("/", require("./swagger"));
router.use('/auth', passport.authenticate('github')); 
router.use('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;