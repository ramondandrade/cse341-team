const mongodb = require("../data/db");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  //#swagger.tags=["Players"]
  try {
    const result = await mongodb.getDatabase().db().collection("players").find();
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
  } catch (error) {
    console.error(error);
  }
};

const getSingleUser = async (req, res) => {
  //#swagger.tags=["Players"]
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("players").find({ _id: userId });
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    });
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (req, res) => {
  /* #swagger.tags=["Players"]
  #swagger.description="Creating a player here is not recommended. If you want to create a player, please go to /auth/github"
  #swagger.parameters["body"] = {
    in: "body",
    '@schema': {
      "type": "object",
      "properties": {
        "username": {
          "example": "your github username"
        },
        "profileUrl": {
          "example": "https://github.com/example"
        },
        "characters": {
          "example": [ ["character_id", "characterName"], ["character_id", "characterName"] ]
        }
      }
    }
  } */
  try {
    const timestamp = Date.now();
    const user = {
      username: req.body.username,
      profileUrl: req.body.profileUrl,
      createdAt: Date(timestamp),
      characters: req.body.characters
    };
    const response = await mongodb.getDatabase().db().collection("players").insertOne(user);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the user.");
    }
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  /* #swagger.tags=["Players"]
  #swagger.description="Please change only your own data when using this route. To use this route copy and paste your username, profileUrl, and characters from the GET /players/, and make the desired changes. Only change your profileUrl if it has changed." 
  #swagger.parameters["body"] = {
    in: "body",
    '@schema': {
      "type": "object",
      "properties": {
        "username": {
          "example": "your github username"
        },
        "profileUrl": {
          "example": "https://github.com/example"
        },
        "characters": {
          "example": [ ["character_id", "characterName"], ["character_id", "characterName"] ]
        }
      }
    }
  } */
  try {
    const userId = new ObjectId(req.params.id);
    const existingUser = await mongodb
      .getDatabase()
      .db()
      .collection("players")
      .findOne({ _id: userId });
    const user = {
      username: req.body.username,
      profileUrl: req.body.profileUrl,
      createdAt: existingUser.createdAt,
      characters: req.body.characters
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("players")
      .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the user.");
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=["Players"]
  //#swagger.description="Please delete only your own user data when using this route"
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("players")
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the user.");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};
