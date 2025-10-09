const router = require("express").Router();
const itemController = require("../controllers/itemController");
const validation = require("../middleware/itemValidate");
const isAuthenticated = require("../middleware/authenticate");

// GET /inventory/ - Get all items
router.get("/", isAuthenticated, itemController.getAllItems);

// GET /inventory/{id} - Get item by ID
router.get("/:id", isAuthenticated, itemController.getSingleItem);

// GET /inventory/user/{characterId} - Get items by character ID
router.get('/character/:characterId', isAuthenticated, itemController.getItemsByCharacterId);

// POST /inventory/ - Create a new item
router.post("/", isAuthenticated, validation.saveItem, itemController.createItem);

// PUT /inventory/{id} - Update item by ID
router.put("/:id", isAuthenticated, validation.saveItem, itemController.updateItem);

// DELETE /inventory/{id} - Delete item by ID
router.delete("/:id", isAuthenticated, itemController.deleteItem);

module.exports = router;
