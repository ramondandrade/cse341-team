const express = require('express');
const routes = require('express').Router();
const characterController = require('../controllers/characterController');
const characterValidate = require('../middleware/characterValidate');
const isAuthenticated = require('../middleware/authenticate');

// GET /character/ - Get all characters
routes.get('/', isAuthenticated, characterController.getAllCharacters);

// GET /character/{id} - Get character by ID
routes.get('/:id', isAuthenticated, characterController.getCharacterById);

// GET /character/user/{id} - Get characters by user ID
routes.get('/user/:id', isAuthenticated, characterController.getCharactersByUserId);

// POST /character/ - Create a new character
routes.post('/', isAuthenticated, characterValidate.validatePost, characterController.createCharacter);

// PUT /character/{char_id} - Update character by ID
routes.put('/:char_id', isAuthenticated, characterValidate.validatePost, characterController.updateCharacter);

// DELETE /character/{id} - Delete character by ID
routes.delete('/:id', isAuthenticated, characterController.deleteCharacter);

module.exports = routes;