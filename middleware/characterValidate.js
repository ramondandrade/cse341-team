const validator = require('../helpers/validate');

const validateCharacter = (req, res, next) => {

  // Validation middleware for character data
  const rules = {
    name: 'required|string|max:100',
    userId: 'required|string',
    class: 'required|string|max:50',
    race: 'required|string|max:50',
    level: 'integer|min:1|max:20',
    hitPoints: 'integer|min:1',
    armorClass: 'integer|min:1',
    strength: 'integer|min:1|max:30',
    dexterity: 'integer|min:1|max:30',
    constitution: 'integer|min:1|max:30',
    intelligence: 'integer|min:1|max:30',
    wisdom: 'integer|min:1|max:30',
    charisma: 'integer|min:1|max:30',
    background: 'string|max:200',
    alignment: 'string|max:50'
  };

  validator(req.body, rules, {}, (err, isValid) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!isValid) {
      return res.status(400).json({ message: 'Validation failed' });
    }
    next();
  });
};

module.exports = { validateCharacter };