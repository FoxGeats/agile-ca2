import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";
import { movieReviews } from '../../../../api/movies/moviesData'
let seedData = {
    movieReviews: []
  }
  movieReviews.results.forEach(review => seedData.movieReviews.push(review))
  
  const expect = chai.expect;
  let db;
  let page;
  let token;
  let date;
  let reviewsLength;
  let rAuthor;
  let rContent;

  describe("Reviews endpoint", () => {
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
   
    //   beforeEach(async () => {
    //     try {
    //       await Movie.deleteMany();
    //       await Movie.collection.insertMany(movies);
    //     } catch (err) {
    //       console.error(`failed to Load user Data: ${err}`);
    //     }
    //   });
      
//
      beforeEach(async () => {
        beforeEach(() => {
          // Clean out datastore
          while (movieReviews.results.length > 0) {
            movieReviews.results.pop()
          }
          // Repopulate datastore
          seedData.movieReviews.forEach(review => movieReviews.results.push(review))
        })
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


      //test
      describe("GET /api/reviews/movie/:id/reviews", () => {
        describe("when the id is valid", () => {
          it("should a object contains a list of the reviews of the movie and a status 200", () => {
            return request(api)
              .get(`/api/reviews/movie/${movieReviews.id}/reviews`)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .then((res) => {
                expect(res.body[0]).to.have.property("id", 527774);
                expect(res.body[0].results).to.be.a("array");
              });
          });
        });
        describe("when movie id is invalid characters like letters", () => {
          it("should return a status 403 and the corresponding message", () => {
            return request(api)
              .get(`/api/reviews/movie/qweqwe/reviews`)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(403)
              .expect({ message: 'Invalid movie id.', status_code: 403 });
          });
        });
        describe("when movie id is invalid", () => {
          it("should return a status 404 and the corresponding message", () => {
            return request(api)
              .get(`/api/reviews/movie/9999999999/reviews`)
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(404)
              .expect({
                message: 'The resource you requested could not be found.',
                status_code: 404
              });
          });
        });
      });
    
      describe("POST /api/reviews/movie/:id/reviews/:username", () => {
        describe("when the id is valid", () => {
          describe("for both the author and content are not empty", () => {
            before(() => {
              rAuthor = "user1",
                rContent = "I like it."
            })
            it("should a object contains a list of the reviews of the movie and a status 200", () => {
              return request(api)
                .post(`/api/reviews/movie/${movieReviews.id}/reviews/${rAuthor}`)
                .send({
                  author: rAuthor,
                  content: rContent
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(201)
                .then((res) => {
                  expect(res.body).to.have.property("author", rAuthor)
                  expect(res.body).to.have.property("content", rContent)
                });
            });
          });
          
          describe("for author is not empty and content is empty", () => {
            it("should return a status 403 and the corresponding message", () => {
              return request(api)
                .post(`/api/reviews/movie/${movieReviews.id}/reviews/${rAuthor}`)
                .send({
                  author: rAuthor,
                  content: ""
                })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(403)
                .expect({ message: 'Invalid author name or content.', status_code: 403 });
            })
          })
          
          
    
        describe("when movie id is invalid", () => {
          it("should return a status 404 and the corresponding message", () => {
            return request(api)
              .post(`/api/reviews/movie/999999999/reviews/${rAuthor}`)
              .send({
                author: rAuthor,
                content: "I like it very much."
              })
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(404)
              .expect({
                message: 'The resource you requested could not be found.',
                status_code: 404
              });
          });
        });
      });
    

  })})