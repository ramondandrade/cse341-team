const mongodb = require("../data/db");
const ObjectId = require("mongodb").ObjectId;

const getAllItems = async (req, res) => {
  //#swagger.tags=["Inventory"]
  try {
    const result = await mongodb.getDatabase().db().collection("inventory").find();
    result.toArray().then((items) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(items);
    });
  } catch (error) {
    console.error(error);
  }
};

const getItemsByCharacterId = async (req, res) => {
  //#swagger.tags=["Inventory"]
  try {
    const id = new ObjectId(req.params.characterId);
    
    if (!id) {
      return res.status(400).json({ message: "Character ID is required" });
    }

    const result = await mongodb.getDatabase().db().collection("inventory").find({ characterId: id });
    result.toArray().then((items) => {
      if (items.length === 0) {
        return res.status(404).json({ message: "No items found for this character" });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(items);
    });
  
    // res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items by character ID:", error);
    res.status(500).json({
      message: "Error fetching items by character ID",
      error: error.message
    });
  }
};

const getSingleItem = async (req, res) => {
  //#swagger.tags=["Inventory"]
  try {
    const itemId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("inventory").find({ _id: itemId });
    result.toArray().then((items) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(items[0]);
    });
  } catch (error) {
    console.error(error);
  }
};

const createItem = async (req, res) => {
  /* #swagger.tags=["Inventory"]
  #swagger.description="One character per item. If you want to give this item to another character you need to make a new item."
  #swagger.parameters["body"] = {
    in: "body",
    '@schema': {
      "type": "object",
      "properties": {
        "name": {
          "example": "Stick"
        },
        "type": {
          "example": "Weapon"
        },
        "rarity": {
          "example": "Common"
        },
        "levelRequirement": {
          "example": 1
        },
        "characterName": {
          "example": "characterName"
        },
        "characterId": {
          "example": "character_id"
        },
        "description": {
          "example": "A long wooden stick"
        },
        "quantity": {
          "example": 1
        },
        "stats": {
          "type": "object",
          "properties": {
            "attack": {
              "example": 1
            },
            "defense": {
              "example": 0
            },
            "manaBoost": {
              "example": 0
            },
            "hpBoost": {
              "example": 0
            }
          }
        }
      }
    }
  } */
  try {
    var qty = 1;
    if (req.body.quantity > 1) {
      qty = req.body.quantity
    }
    const item = {
      name: req.body.name,
      type: req.body.type,
      rarity: req.body.rarity,
      characterName: req.body.characterName,
      characterId: req.body.characterId,
      description: req.body.description,
      quantity: qty,
      stats: req.body.stats,
      levelRequirement: req.body.levelRequirement
    };
    const response = await mongodb.getDatabase().db().collection("inventory").insertOne(item);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Item created successfully', character: item });
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the item.");
    }
  } catch (error) {
    console.error(error);
  }
};

const updateItem = async (req, res) => {
  try {
  /* #swagger.tags=["Inventory"]
  #swagger.parameters["body"] = {
    in: "body",
    '@schema': {
      "type": "object",
      "properties": {
        "name": {
          "example": "Stick"
        },
        "type": {
          "example": "Weapon"
        },
        "rarity": {
          "example": "Common"
        },
        "levelRequirement": {
          "example": 1
        },
        "characterName": {
          "example": "characterName"
        },
        "characterId": {
          "example": "character_id"
        },
        "description": {
          "example": "A long wooden stick"
        },
        "quantity": {
          "example": 1
        },
        "stats": {
          "type": "object",
          "properties": {
            "attack": {
              "example": 1
            },
            "defense": {
              "example": 0
            },
            "manaBoost": {
              "example": 0
            },
            "hpBoost": {
              "example": 0
            }
          }
        }
      }
    }
  } */
    const itemId = new ObjectId(req.params.id);
    var qty = 1;
    if (req.body.quantity > 1) {
      qty = req.body.quantity
    }
    const item = {
      name: req.body.name,
      type: req.body.type,
      rarity: req.body.rarity,
      characterName: req.body.characterName,
      characterId: req.body.characterId,
      description: req.body.description,
      quantity: qty,
      stats: req.body.stats,
      levelRequirement: req.body.levelRequirement
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("inventory")
      .replaceOne({ _id: itemId }, item);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Item updated successfully', character: item });
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the item.");
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteItem = async (req, res) => {
  //#swagger.tags=["Inventory"]
  //#swagger.description="Please delete only items connected to your characters when using this route"
  try {
    const itemId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("inventory")
      .deleteOne({ _id: itemId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the item.");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllItems,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
  getItemsByCharacterId
};
