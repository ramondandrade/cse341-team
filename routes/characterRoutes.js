const routes = require('express').Router();
const characterController = require('../controllers/characterController');
const characterValidation = require('../middleware/characterValidate');

// GET /character/ - Get all characters
routes.get('/', characterController.getAllCharacters);

// GET /character/{id} - Get character by ID
routes.get('/:id', characterController.getCharacterById);

// GET /character/user/{id} - Get characters by user ID
routes.get('/user/:id', characterController.getCharactersByUserId);

// POST /character/ - Create a new character
routes.post('/', characterValidation.validateCharacter, characterController.createCharacter);

// PUT /character/{char_id} - Update character by ID
routes.put('/:char_id', characterValidation.validateCharacter, characterController.updateCharacter);

// DELETE /character/{id} - Delete character by ID
routes.delete('/:id', characterController.deleteCharacter);

module.exports = routes;