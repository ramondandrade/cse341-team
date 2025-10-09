const Quest = require('../models/Quest');
const { validationResult } = require('express-validator');

// Get all quests
const getAllQuests = async (req, res) => {
  /*
    #swagger.tags = ['Quests']
    #swagger.summary = 'Get all quests'
    #swagger.description = 'Retrieve all quests from the database'
    #swagger.responses[200] = {
      description: 'Quests retrieved successfully',
      schema: {
        type: 'array',
        items: { $ref: '#/definitions/Quest' }
      }
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  try {
    const quests = await Quest.find({});
    res.status(200).json(quests);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({
      message: 'Error fetching quests',
      error: error.message
    });
  }
};

// Get quest by ID
const getQuestById = async (req, res) => {
  /*
    #swagger.tags = ['Quests']
    #swagger.summary = 'Get quest by ID'
    #swagger.description = 'Retrieve a specific quest by its ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Quest ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Quest retrieved successfully',
      schema: { $ref: '#/definitions/Quest' }
    }
    #swagger.responses[404] = {
      description: 'Quest not found'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Quest ID is required' });
    }

    const quest = await Quest.findById(id);
    
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }

    res.status(200).json(quest);
  } catch (error) {
    console.error('Error fetching quest:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid quest ID format' });
    }
    res.status(500).json({
      message: 'Error fetching quest',
      error: error.message
    });
  }
};

// Create a new quest
const createQuest = async (req, res) => {
  /*
    #swagger.tags = ['Quests']
    #swagger.summary = 'Create a new quest'
    #swagger.description = 'Create a new quest in the database'
    #swagger.parameters['quest'] = {
      in: 'body',
      description: 'Quest data',
      required: true,
       '@schema': {
        type: 'object',
        properties: {
          name: { type: 'string', required: true, example: 'Aragorn' },
          userId: { type: 'string', required: true, example: 'user123' },
          class: { type: 'string', required: true, example: 'Fighter' },
          race: { type: 'string', required: true, example: 'Human' },
          level: { type: 'integer', required: true, example: 5 },
          hitPoints: { type: 'integer', required: true, example: 50 },
          armorClass: { type: 'integer', required: true, example: 16 },
          strength: { type: 'integer', required: true, example: 18 },
          dexterity: { type: 'integer', required: true, example: 14 },
          constitution: { type: 'integer', required: true, example: 16 },
          intelligence: { type: 'integer', required: true, example: 10 },
          wisdom: { type: 'integer', required: true, example: 12 },
          charisma: { type: 'integer', required: true, example: 8 },
          background: { type: 'string', example: 'Noble' },
          alignment: { type: 'string', example: 'Lawful Good' }
        }
       }
    }
    #swagger.responses[201] = {
      description: 'Quest created successfully'
    }
    #swagger.responses[400] = {
      description: 'Invalid input data'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const questData = req.body;
    
    // Create new quest
    const newQuest = new Quest(questData);
    const savedQuest = await newQuest.save();

    res.status(201).json({
      message: 'Quest created successfully',
      quest: savedQuest
    });
  } catch (error) {
    console.error('Error creating quest:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    res.status(500).json({
      message: 'Error creating quest',
      error: error.message
    });
  }
};

// Update quest by ID
const updateQuest = async (req, res) => {
  /*
    #swagger.tags = ['Quests']
    #swagger.summary = 'Update quest by ID'
    #swagger.description = 'Update an existing quest by its ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Quest ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['quest'] = {
      in: 'body',
      description: 'Updated quest data',
      required: true,
      schema: { $ref: '#/definitions/QuestInput' }
    }
    #swagger.responses[200] = {
      description: 'Quest updated successfully',
      schema: { $ref: '#/definitions/Quest' }
    }
    #swagger.responses[400] = {
      description: 'Invalid input data'
    }
    #swagger.responses[404] = {
      description: 'Quest not found'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id) {
      return res.status(400).json({ message: 'Quest ID is required' });
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const updatedQuest = await Quest.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, // Return the updated document
        runValidators: true // Run model validations
      }
    );

    if (!updatedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }

    res.status(200).json({
      message: 'Quest updated successfully',
      quest: updatedQuest
    });
  } catch (error) {
    console.error('Error updating quest:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid quest ID format' });
    }
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    res.status(500).json({
      message: 'Error updating quest',
      error: error.message
    });
  }
};

// Delete quest by ID
const deleteQuest = async (req, res) => {
  /*
    #swagger.tags = ['Quests']
    #swagger.summary = 'Delete quest by ID'
    #swagger.description = 'Delete a quest from the database by its ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Quest ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Quest deleted successfully'
    }
    #swagger.responses[404] = {
      description: 'Quest not found'
    }
    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Quest ID is required' });
    }

    const deletedQuest = await Quest.findByIdAndDelete(id);
    
    if (!deletedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }

    res.status(200).json({
      message: 'Quest deleted successfully',
      quest: deletedQuest
    });
  } catch (error) {
    console.error('Error deleting quest:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid quest ID format' });
    }
    res.status(500).json({
      message: 'Error deleting quest',
      error: error.message
    });
  }
};

module.exports = {
  getAllQuests,
  getQuestById,
  createQuest,
  updateQuest,
  deleteQuest
};