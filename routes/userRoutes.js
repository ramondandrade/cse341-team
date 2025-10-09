const router = require("express").Router();
const userController = require("../controllers/userController");
const validation = require("../middleware/userValidate");
const isAuthenticated = require("../middleware/authenticate");

// GET /player/ - Get all users
router.get("/", userController.getAllUsers);

// GET /player/{id} - Get user by ID
router.get("/:id", userController.getSingleUser);

// POST /player/ - Create a new user
router.post("/", isAuthenticated, validation.saveUser, userController.createUser);

// PUT /player/{id} - Update user by ID
router.put("/:id", isAuthenticated, validation.saveUser, userController.updateUser);

// DELETE /player/{id} - Delete user by ID
router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
