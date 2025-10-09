const router = require("express").Router();
const itemController = require("../controllers/itemController");
const validation = require("../middleware/itemValidate");

// GET /inventory/ - Get all items
router.get("/", itemController.getAllItems);

// GET /inventory/{id} - Get item by ID
router.get("/:id", itemController.getSingleItem);

// GET /inventory/user/{characterId} - Get items by character ID
router.get('/character/:characterId', itemController.getItemsByCharacterId
);

// POST /inventory/ - Create a new item
router.post("/", validation.saveItem, itemController.createItem);

// PUT /inventory/{id} - Update item by ID
router.put("/:id", validation.saveItem, itemController.updateItem);

// DELETE /inventory/{id} - Delete item by ID
router.delete("/:id", itemController.deleteItem);

module.exports = router;
