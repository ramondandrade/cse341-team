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
        type: 'array'
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
  /* #swagger.tags = ['Quests']
    #swagger.summary = 'Get quest by ID'
    #swagger.description = 'Retrieve a specific quest by its ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Quest ID',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Quest retrieved successfully'
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
        title: {
          type: 'string',
          description: 'Title of the quest',
          example: 'The Lost Artifact'
        },
        description: {
          type: 'string',
          description: 'Description of the quest',
          example: 'Find the lost artifact hidden in the ancient ruins.'
        },
        difficulty: {
          type: 'string',
          description: 'Difficulty level of the quest',
          enum: ['easy', 'medium', 'hard', 'legendary'],
          example: 'medium'
        },
        experienceReward: {
          type: 'number',
          description: 'Experience points rewarded for completing the quest',
          example: 500
        },
        goldReward: {
          type: 'number',
          description: 'Gold coins rewarded for completing the quest',
          example: 250
        },
        itemReward: {
          type: 'string',
          description: 'Item rewarded for completing the quest',
          example: 'Rusty Sword'
        },
        questGiver: {
          type: 'string',
          description: 'Name of the quest giver',
          example: 'Old Man Hemlock'
        },
        location: {
          type: 'string',
          description: 'Location where the quest takes place',
          example: 'Ancient Ruins'
        },
        requirements: {
          type: 'array',
          items: {
        type: 'string',
        description: 'A requirement for the quest',
        example: 'Level 5'
          }
        },
        objectives: {
          type: 'array',
          items: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description: 'Description of the objective',
            example: 'Find the entrance to the inner chamber'
          },
          completed: {
            type: 'boolean',
            description: 'Whether the objective is completed',
            example: false
          }
        }
          }
        },
        status: {
          type: 'string',
          description: 'Current status of the quest',
          enum: ['available', 'in-progress', 'completed', 'failed', 'locked'],
          example: 'available'
        },
        estimatedDuration: {
          type: 'string',
          description: 'Estimated duration to complete the quest',
          example: '2 hours'
        },
        questType: {
          type: 'string',
          description: 'Type of the quest',
          enum: ['main', 'side', 'daily', 'weekly', 'event'],
          example: 'side'
        },
        isRepeatable: {
          type: 'boolean',
          description: 'Whether the quest can be repeated',
          example: false
        },
        minimumLevel: {
          type: 'number',
          description: 'Minimum level required to start the quest',
          example: 3
        }
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
      required: true
    }
    #swagger.responses[200] = {
      description: 'Quest updated successfully'
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