import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";

const expect = chai.expect;
let db;
let page;
describe("Movies endpoint", () => {
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
      await Movie.deleteMany();
      await Movie.collection.insertMany(movies);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });


  describe("GET /api/movies ", () => {
    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/movies")
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

  describe("GET /api/movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${movies[0].id}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", movies[0].title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/movies/0")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({
            status_code: 404,
            message: "The resource you requested could not be found.",
          });
      });
    });
  });

//upcoming
describe("GET /api/movies/tmdb/upcoming/:page", () => {
    describe("when the page is valid number", () => {
      before(() => {
        page = 2
      })
      it("should return 20 movies of corresponding page from tmdb and a status 200", () => {
        return request(api)
          .get(`/api/movies/tmdb/upcoming/${page}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("page", page);
            expect(res.body.results).to.be.a("array");
            expect(res.body.results.length).to.equal(20);
          });
      });
    });
    describe("when the page is an invalid character", () => {
      before(() => {
        page = 0
      })
      it("should return a status 404 and the corresponding message", () => {
        return request(api)
          .get(`/api/movies/tmdb/upcoming/${page}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({
            status_code: 404,
            message: "The resource you requested could not be found.",
          });
      });
    });
  });

  describe("GET /api/movies/tmdb/topRated/:page", () => {
    describe("when the page is valid number", () => {
      before(() => {
        page = 2
      })
      it("should return 20 movies of corresponding page from tmdb and a status 200", () => {
        return request(api)
          .get(`/api/movies/tmdb/topRated/${page}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("page", page);
            expect(res.body.results).to.be.a("array");
            expect(res.body.results.length).to.equal(20);
          });
      });
    });
    describe("when the page is an invalid character", () => {
      before(() => {
        page = 0
      })
      it("should return a status 404 and the corresponding message", () => {
        return request(api)
          .get(`/api/movies/tmdb/topRated/${page}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({
            status_code: 404,
            message: "The resource you requested could not be found.",
          });
      });
    });
  });



  describe("GET /api/movies/movie/:id/images", () => {

      describe("when the id is valid number", () => {
        it("should return an object containing the images and status 200", () => {
          return request(api)
            .get(`/api/movies/tmdb/movie/${movies[0].id}/images`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body).to.have.property("id", movies[0].id);
              expect(res.body).to.have.property("backdrops");
              expect(res.body).to.have.property("posters");
            });
        });
      });
      describe("when the id is not number", () => {
        it("should return a status 403 and the corresponding message", () => {
          return request(api)
            .get(`/api/movies/tmdb/movie/qwe/images`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .expect({ message: 'Invalid movie id.', status_code: 403 });
        });
      });
    });
  })




