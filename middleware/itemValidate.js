const validator = require("../helpers/validate");

const saveItem = (req, res, next) => {
  const validationRule = {
    name: "required|string|max:100",
    type: "required|string",
    rarity: "required|string",
    characterName: "required|string",
    characterId: "required|string",
    description: "required|string",
    quantity: "present|integer|min:1",
    stats: {
      attack: "present|integer|min:0",
      defense: "present|integer|min:0",
      manaBoost: "present|integer|min:0",
      hpBoost: "present|integer|min:0"
    },
    levelRequirement: "required|integer|min:1|max:20"
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
  saveItem
};