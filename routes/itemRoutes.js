const routes = require("express").Router();
const itemController = require("../controllers/itemController");
const itemValidation = require("../middleware/itemValidate");

// GET /inventory/ - Get all items
routes.get("/", itemController.getAllItems);

// GET /inventory/{id} - Get item by ID
routes.get("/:id", itemController.getSingleItem);

// GET /inventory/user/{characterId} - Get items by character ID
routes.get('/character/:characterId', itemController.getItemsByCharacterId);

// POST /inventory/ - Create a new item
routes.post("/", itemValidation.validateItem, itemController.createItem);

// PUT /inventory/{id} - Update item by ID
routes.put("/:id", itemValidation.validateItem, itemController.updateItem);

// DELETE /inventory/{id} - Delete item by ID
routes.delete("/:id", itemController.deleteItem);

module.exports = routes;