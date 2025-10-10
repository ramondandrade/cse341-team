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
    await db.collection("mock_players").deleteMany({});
  });

  afterAll(async() => {
    await connection.close();
  });

  it("should insert two docs into the collection", async () => {
    const players = db.collection("mock_players");

    const mockPlayer = {
      _id: "some-players-id", 
      username: "req.body.userrrname",
      profileUrl: "req.body.profileUrl",
      createdAt: "Date(timestamp)",
      characters: "req.body.characters"
    };

    const mockPlayer2 = {
      _id: "some-other-players-id", 
      username: "req.body.username",
      profileUrl: "req.body.profileUrl",
      createdAt: "Date(timestamp)",
      characters: "req.body.characters"
    };

    await players.insertOne(mockPlayer);
    await players.insertOne(mockPlayer2);

    const insertedplayer = await players.findOne({_id: "some-players-id"});
    const insertedplayer2 = await players.findOne({_id: "some-other-players-id"});

    expect(insertedplayer).toEqual(mockPlayer);
    expect(insertedplayer2).toEqual(mockPlayer2);
  });
  
  it("should return two docs from the collection", async () => {
    const players = await db.collection("mock_players").find();

    players.toArray().then((result) => {
      expect(result.length).toBe(2);
    });
  });

  it("should update a doc in the collection", async () => {
    const players = db.collection("mock_players");

    const mockPlayer = {
      _id: "some-players-id", 
      username: "req.body.userrrnaaaame",
      profileUrl: "req.body.profileUrl",
      createdAt: "Date(timestamp)",
      characters: "req.body.characters"
    };
    await players.replaceOne({ _id: mockPlayer._id }, mockPlayer);
    
    const updatedplayer = await players.findOne({_id: "some-players-id"});
    expect(updatedplayer).toEqual(mockPlayer);
  });
  
  it("should return a doc from the collection", async () => {
    const players = await db.collection("mock_players").find({_id: "some-players-id"});

    players.toArray().then((result) => {
      expect(result.length).toBe(1);
    });
  });

  it("should delete a doc from the collection", async () => {
    const players = db.collection("mock_players");

    await players.deleteMany({ _id: "some-players-id" });
    
    const deletedplayer = await players.findOne({_id: "some-players-id"});
    expect(deletedplayer).toEqual(null);
  });
});