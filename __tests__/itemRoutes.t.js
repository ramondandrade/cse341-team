const express = require("express");
const router = require("../routes/itemRoutes");
const { MongoClient } = require("mongodb");
const app = express();
app.use("/", router);

describe("inventory", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async() => {
    await db.collection("mock_inventory").deleteMany({});
    await connection.close();
  });

  it("should insert two docs into the collection", async () => {
    const items = db.collection("mock_inventory");

    const mockItem = {
      _id: "some-items-id", 
      name: "req.body.name",
      type: "req.body.type",
      rarity: "req.body.rarity",
      characterName: "req.body.characterName",
      characterId: "req.body.characttterId",
      description: "req.body.description",
      quantity: "qty",
      stats: "req.body.stats",
      levelRequirement: "req.body.levelRequirement"
    };

    const mockItem2 = {
      _id: "some-other-items-id", 
      name: "req.body.name",
      type: "req.body.type",
      rarity: "req.body.rarity",
      characterName: "req.body.characterName",
      characterId: "req.body.characterId",
      description: "req.body.description",
      quantity: "qty",
      stats: "req.body.stats",
      levelRequirement: "req.body.levelRequirement"
    };

    await items.insertOne(mockItem);
    await items.insertOne(mockItem2);

    const insertedItem = await items.findOne({_id: "some-items-id"});
    const insertedItem2 = await items.findOne({_id: "some-other-items-id"});

    expect(insertedItem).toEqual(mockItem);
    expect(insertedItem2).toEqual(mockItem2);
  });
  
  // getAllItems
  it("should return two docs from the collection", async () => {
    const items = await db.collection("mock_inventory").find();

    items.toArray().then((result) => {
      expect(result.length).toBe(2);
    });
  });

  it("should update a doc in the collection", async () => {
    const items = db.collection("mock_inventory");

    const mockItem = {
      _id: "some-items-id", 
      name: "req.body.name",
      type: "req.body.type",
      rarity: "req.body.rarity",
      characterName: "req.body.characterName",
      characterId: "req.body.characterId",
      description: "req.body.description",
      quantity: "qty",
      stats: "req.body.stats",
      levelRequirement: "req.body.levelRequirement"
    };
    await items.replaceOne({ _id: mockItem._id }, mockItem);
    
    const updatedItem = await items.findOne({_id: "some-items-id"});
    expect(updatedItem).toEqual(mockItem);
  });
  
  // getSingleItem
  it("should return a doc from the collection", async () => {
    const items = await db.collection("mock_inventory").find({_id: "some-items-id"});

    items.toArray().then((result) => {
      expect(result.length).toBe(1);
    });
  });

  // getItemsByCharacterId
  it("should return two docs from the collection", async () => {
    const items = await db.collection("mock_inventory").find({characterId: "req.body.characterId"});

    items.toArray().then((result) => {
      expect(result.length).toBe(2);
    });
  });

  it("should delete a doc from the collection", async () => {
    const items = db.collection("mock_inventory");

    await items.deleteMany({ _id: "some-items-id" });
    
    const deletedItem = await items.findOne({_id: "some-items-id"});
    expect(deletedItem).toEqual(null);
  });
});