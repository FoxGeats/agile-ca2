import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
//import Person from "../../../../api/people/peopleModel";
import api from "../../../../index";
import people from "../../../../api/actors/actorsData";
// import User from "../../../../api/users/userModel";

// set up seed data for datastore
const expect = chai.expect;
let db;
let token;
let page;
let personId;
describe("People endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });
//   beforeEach(async () => {
//     try {
//       await Person.deleteMany();
//       await Person.collection.insertMany(people);
//       await User.deleteMany();
//       // Register a user
//       await request(api).post("/api/users?action=register").send({
//         username: "user1",
//         password: "test1",
//       });
//     } catch (err) {
//       console.error(`failed to Load user Data: ${err}`);
//     }
//   });
  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /api/actors/popular", () => {
    
      it("should return 20 people and a status 200", (done) => {
        request(api)
          .get(`/api/actors/popular`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body.results).to.be.a("array");
            expect(res.body.results.length).to.equal(20);
            done();
          });
      });
    
   
  });

  describe("GET /api/actors/:id", () => {
   
      describe("for valid id", () => {
        it("should an object of people and a status 200", (done) => {
          request(api)
            .get(`/api/actors/${people[0].id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              expect(res.body).to.have.property("name", people[0].name);
              done();
            });
        
      });
      describe("for invalid id", () => {
        it("should return the NOT found message", () => {
          request(api)
            .get(`/api/actors/123123`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404)
            .expect({ message: 'The resource you requested could not be found.', status_code: 404 })
        });
      });
      
    });
  });





  describe("GET /api/actors/:id/images", () => {
    
      describe("for a valid id", () => {
        before(() => {
          personId = 287
        })
        it("should return a person's images from tmdb and a status 200", () => {
          return request(api)
            .get(`/api/actors/${personId}/images`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property("id", personId);
              expect(res.body).to.have.property("profiles");
            });
        });
      });
      describe("for an invalid id", () => {
        before(() => {
          personId = "qwe"
        })
        it("should return error message and a status 403", () => {
          return request(api)
            .get(`/api/actors/${personId}/images`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .expect({
              message: 'Invalid actor id.', status_code: 403
            });
        });
      
   
    });
  });

  describe("GET /api/actors/:id/movies", () => {
    
      describe("for a valid id", () => {
        before(() => {
          personId = 287
        })
        it("should return a person's movie credits from tmdb and a status 200", () => {
          return request(api)
            .get(`/api/actors/${personId}/movies`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property("cast");
              expect(res.body.cast).to.be.a("array");
            });
        
      });
      describe("for an invalid id", () => {
        before(() => {
          personId = "qwe"
        })
        it("should return error message and a status 404", () => {
          return request(api)
            .get(`/api/actors/${personId}/movies`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .expect({
              message: 'Invalid actor id.', status_code: 403
            });
        });
      });
    
    });
  });


});   