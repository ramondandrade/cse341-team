const routes = require('express').Router();
const questController = require('../controllers/questController');
const questValidation = require('../middleware/questValidate');

// GET /quest/ - Get all quests
routes.get('/', questController.getAllQuests);

// GET /quest/{id} - Get quest by ID
routes.get('/:id', questController.getQuestById);

// POST /quest/ - Create a new quest
routes.post('/', questValidation.validateQuest, questController.createQuest);

// PUT /quest/{id} - Update quest by ID
routes.put('/:id', questValidation.validateQuest, questController.updateQuest);

// DELETE /quest/{id} - Delete quest by ID
routes.delete('/:id', questController.deleteQuest);

module.exports = routes;