const validator = require("../helpers/validate");

const saveUser = (req, res, next) => {
  const validationRule = {
    displayName: "required|string",
    profileUrl: "required|string",
    createdAt: "required|string",
    characters: "required|array"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser
};
