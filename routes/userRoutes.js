const routes = require("express").Router();
const userController = require("../controllers/userController");
const userValidation = require("../middleware/userValidate");
const isAuthenticated = require("../middleware/authenticate");

// GET /player/ - Get all users
routes.get("/", userController.getAllUsers);

// GET /player/{id} - Get user by ID
routes.get("/:id", userController.getSingleUser);

// POST /player/ - Create a new user
routes.post("/", isAuthenticated, userValidation.validateUser, userController.createUser);

// PUT /player/{id} - Update user by ID
routes.put("/:id", isAuthenticated, userValidation.validateUser, userController.updateUser);

// DELETE /player/{id} - Delete user by ID
routes.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = routes;