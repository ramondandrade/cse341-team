const Character = require('../models/Character');

// Get all characters
const getAllCharacters = async (req, res) => {
 
  try {
    const characters = await Character.find({});
    res.status(200).json(characters);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({
      message: 'Error fetching characters',
      error: error.message
    });
  }
};

// Get character by ID
const getCharacterById = async (req, res) => {
  
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Character ID is required' });
    }

    const character = await Character.findById(id);
    
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json(character);
  } catch (error) {
    console.error('Error fetching character:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid character ID format' });
    }
    res.status(500).json({
      message: 'Error fetching character',
      error: error.message
    });
  }
};

// Get characters by user ID
const getCharactersByUserId = async (req, res) => {
 
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const characters = await Character.find({ userId: id });
    
    if (characters.length === 0) {
      return res.status(404).json({ message: 'No characters found for this user' });
    }

    res.status(200).json(characters);
  } catch (error) {
    console.error('Error fetching characters by user ID:', error);
    res.status(500).json({
      message: 'Error fetching characters by user ID',
      error: error.message
    });
  }
};

// Create a new character
const createCharacter = async (req, res) => {
 
  try {

    const characterData = req.body;
    
    // Create new character
    const newCharacter = new Character(characterData);
    const savedCharacter = await newCharacter.save();

    res.status(201).json({
      message: 'Character created successfully',
      character: savedCharacter
    });
  } catch (error) {
    console.error('Error creating character:', error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    res.status(500).json({
      message: 'Error creating character',
      error: error.message
    });
  }
};

// Update character by ID
const updateCharacter = async (req, res) => {
  
  try {
    const { char_id } = req.params;
    const updateData = req.body;
    
    if (!char_id) {
      return res.status(400).json({ message: 'Character ID is required' });
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const updatedCharacter = await Character.findByIdAndUpdate(
      char_id,
      updateData,
      { 
        new: true, // Return the updated document
        runValidators: true // Run model validations
      }
    );

    if (!updatedCharacter) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json({
      message: 'Character updated successfully',
      character: updatedCharacter
    });
  } catch (error) {
    console.error('Error updating character:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid character ID format' });
    }
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    res.status(500).json({
      message: 'Error updating character',
      error: error.message
    });
  }
};

// Delete character by ID
const deleteCharacter = async (req, res) => {
 
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'Character ID is required' });
    }

    const deletedCharacter = await Character.findByIdAndDelete(id);
    
    if (!deletedCharacter) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.status(200).json({
      message: 'Character deleted successfully',
      character: deletedCharacter
    });
  } catch (error) {
    console.error('Error deleting character:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid character ID format' });
    }
    res.status(500).json({
      message: 'Error deleting character',
      error: error.message
    });
  }
};

module.exports = {
  getAllCharacters,
  getCharacterById,
  getCharactersByUserId,
  createCharacter,
  updateCharacter,
  deleteCharacter
};