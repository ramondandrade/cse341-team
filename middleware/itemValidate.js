const validator = require("../helpers/validate");

const validateItem = (req, res, next) => {

  // Validation middleware for item data
  const rules = {
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

module.exports = { validateItem };