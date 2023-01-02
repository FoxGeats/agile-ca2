import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Genre from "../../../../api/genres/genreModel.js";
import api from "../../../../index";


// set up seed data for datastore
const expect = chai.expect;
let db;

describe("Genres endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    try {
      await Genre.deleteMany();
      await Genre.collection.insertMany(genres);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
 
  describe("GET /api/genres/ ", () => {
    it("should return a list of genres and a status 200", (done) => {
      request(api)
        .get("/api/genres")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.genres).to.be.a("array");
          done();
        });
    });
  });
});