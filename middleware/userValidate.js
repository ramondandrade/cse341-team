const validator = require("../helpers/validate");

const validateUser = (req, res, next) => {

  // Validation middleware for user data
  const rules = {
    username: "required|string",
    profileUrl: "required|string",
    createdAt: "string",
    characters: "required|array"
  };

  validator(req.body, rules, {}, (err, isValid) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!isValid) {
      return res.status(400).json({ message: "Validation failed" });
    }
    next();
  });
};

module.exports = { validateUser };