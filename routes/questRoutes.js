const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');
const questValidation = require('../middleware/questValidate');
const isAuthenticated = require('../middleware/authenticate');

// GET /quest/ - Get all quests
router.get('/', isAuthenticated,  questController.getAllQuests);

// GET /quest/{id} - Get quest by ID
router.get('/:id', isAuthenticated, questController.getQuestById);

// POST /quest/ - Create a new quest
router.post('/', isAuthenticated, questValidation.saveQuest, questController.createQuest);

// PUT /quest/{id} - Update quest by ID
router.put('/:id', isAuthenticated, questValidation.saveQuest, questController.updateQuest);

// DELETE /quest/{id} - Delete quest by ID
router.delete('/:id', isAuthenticated, questController.deleteQuest);

module.exports = router;