const express = require("express");
const router = require("../routes/userRoutes");
const { MongoClient } = require("mongodb");
const app = express();
app.use("/", router);

describe("players", () => {
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
    await db.collection("mock_players").deleteMany({});
    await connection.close();
  });

  it("should insert two docs into the collection", async () => {
    const users = db.collection("mock_players");

    const mockUser = {
      _id: "some-players-id", 
      username: "req.body.userrrname",
      profileUrl: "req.body.profileUrl",
      createdAt: "Date(timestamp)",
      characters: "req.body.characters"
    };

    const mockUser2 = {
      _id: "some-other-players-id", 
      username: "req.body.username",
      profileUrl: "req.body.profileUrl",
      createdAt: "Date(timestamp)",
      characters: "req.body.characters"
    };

    await users.insertOne(mockUser);
    await users.insertOne(mockUser2);

    const insertedUser = await users.findOne({_id: "some-players-id"});
    const insertedUser2 = await users.findOne({_id: "some-other-players-id"});

    expect(insertedUser).toEqual(mockUser);
    expect(insertedUser2).toEqual(mockUser2);
  });
  
  // getAllUsers
  it("should return two docs from the collection", async () => {
    const users = await db.collection("mock_players").find();

    users.toArray().then((result) => {
      expect(result.length).toBe(2);
    });
  });

  it("should update a doc in the collection", async () => {
    const users = db.collection("mock_players");

    const mockUser = {
      _id: "some-players-id", 
      username: "req.body.userrrnaaaame",
      profileUrl: "req.body.profileUrl",
      createdAt: "Date(timestamp)",
      characters: "req.body.characters"
    };
    await users.replaceOne({ _id: mockUser._id }, mockUser);
    
    const updatedUser = await users.findOne({_id: "some-players-id"});
    expect(updatedUser).toEqual(mockUser);
  });
  
  // getSingleUser
  it("should return a doc from the collection", async () => {
    const users = await db.collection("mock_players").find({_id: "some-players-id"});

    users.toArray().then((result) => {
      expect(result.length).toBe(1);
    });
  });

  it("should delete a doc from the collection", async () => {
    const users = db.collection("mock_players");

    await users.deleteMany({ _id: "some-players-id" });
    
    const deletedUser = await users.findOne({_id: "some-players-id"});
    expect(deletedUser).toEqual(null);
  });
});